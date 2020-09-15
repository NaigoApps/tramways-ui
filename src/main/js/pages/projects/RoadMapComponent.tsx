import {Button} from "@material-ui/core";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {AnalysisType, Lane, RelevantPoint, RoadMap, RoadMapContent} from "../../api/generated";
import ApiContext from "../../ApiContext";
import {RouteComponentProps} from "@reach/router";
import {JSONComponent} from "../../widgets/JSONComponent";
import cytoscape from "cytoscape";
import {decimalProperty} from "./roadmap/properties";
import AvailableAnalysisDialog from "./roadmap/analysis/AvailableAnalysisDialog";
import AnalysisDialog from "./roadmap/analysis/AnalysisDialog";
import RoadMapMenu from "./roadmap/RoadMapMenu";
import RelevantPointEditorDialog from "./roadmap/RelevantPointEditorDialog";
import LaneEditorDialog from "./roadmap/LaneEditorDialog";

interface RoadMapComponentProps extends RouteComponentProps {
    projectId: string;
    roadMap: RoadMap;
    refresh: () => void;
}

export default function RoadMapComponent({
    projectId,
    roadMap,
    refresh,
    navigate
}: RoadMapComponentProps) {

    const {projectsApi} = useContext(ApiContext);

    const editMap = useCallback((mapContent: RoadMapContent) => {
        return projectsApi.updateMap(projectId, roadMap.uuid, {
            map: {
                ...roadMap,
                content: mapContent
            }
        }).then(() => {
            refresh();
        });
    }, [roadMap, projectId, projectsApi, refresh]);

    function addNode(node: RelevantPoint) {
        roadMap.content.points.push(node);
        editMap(roadMap.content).then(() => setShowMenu(false));
    }

    function updateNode(node: RelevantPoint) {
        const index = roadMap.content.points.findIndex(n => n.id === node.id);
        roadMap.content.points[index] = node;
        editMap(roadMap.content).then(() => setCurrentNode(null));
    }

    function deleteCurrentNode() {
        const index = roadMap.content.points.findIndex(n => n.id === currentNode.id);
        roadMap.content.points.splice(index, 1);
        editMap(roadMap.content).then(() => setCurrentNode(null));
    }

    function addLane(lane: RelevantPoint) {
        roadMap.content.lanes.push(lane);
        editMap(roadMap.content).then(() => setShowMenu(false));
    }

    function updateLane(lane: RelevantPoint) {
        const index = roadMap.content.lanes.findIndex(l => l.id === lane.id);
        roadMap.content.lanes[index] = lane;
        editMap(roadMap.content).then(() => setCurrentLane(null));
    }

    function deleteCurrentLane() {
        const index = roadMap.content.lanes.findIndex(l => l.id === currentLane.id);
        roadMap.content.lanes.splice(index, 1);
        editMap(roadMap.content).then(() => setCurrentLane(null));
    }

    const [currentNode, setCurrentNode] = useState<RelevantPoint>(null);
    const [currentLane, setCurrentLane] = useState<Lane>(null);

    const [showMenu, setShowMenu] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [container, setContainer] = useState<HTMLElement>(null);
    const [showAnalysisDialog, setShowAnalysisDialog] = useState(false);

    const [chosenAnalysis, setChosenAnalysis] = useState<AnalysisType>(null);

    const [eventX, setEventX] = useState<number>(0);
    const [eventY, setEventY] = useState<number>(0);

    const [network, setNetwork] = useState<cytoscape.Core>(null);

    const refreshNetwork = useCallback(() => {
        if (roadMap && container) {
            try {
                const net = cytoscape({
                    container: container,
                    elements: {
                        nodes: roadMap?.content?.points.map(rp => ({
                            data: {
                                id: rp.id
                            },
                            position: {
                                x: decimalProperty(rp.props, 'x')?.value * container.clientWidth,
                                y: decimalProperty(rp.props, 'y')?.value * container.clientHeight
                            },
                            // locked: true
                        })),
                        edges: roadMap?.content?.lanes.map(lane => ({
                            data: {
                                id: lane.id,
                                source: lane.sourceId,
                                target: lane.destinationId
                            }
                        }))
                    },
                    style: [
                        {
                            selector: 'node',
                            style: {
                                label: 'data(id)'
                            }
                        }, {
                            selector: 'edge',
                            style: {
                                // "mid-arrow-color": "#CCC",
                                "mid-target-arrow-shape": "triangle"
                            }
                        }
                    ],
                    layout: {
                        name: 'preset',
                        fit: true
                    }
                });
                net.on('tapend', 'node', evt => {
                    const id = evt.target.id();
                    const newPos = evt.target.position();
                    const newX = newPos.x / container.clientWidth;
                    const newY = newPos.y / container.clientHeight;
                    const points = roadMap.content.points;
                    const point = points.find(p => p.id === id);
                    const pointProps = point.props;
                    const oldX = decimalProperty(pointProps, 'x');
                    const oldY = decimalProperty(pointProps, 'y');
                    if (oldX.value !== newX && oldY.value !== newY) {
                        oldX.value = newX;
                        oldY.value = newY;
                        editMap(roadMap.content);
                    }
                });
                net.on('cxttapend ', 'node', evt => {
                    setTimeout(() => {
                        const id = evt.target.id();
                        const points = roadMap.content.points;
                        const point = points.find(p => p.id === id);
                        setCurrentNode(point);
                    }, 0);
                });
                net.on('cxttapend ', 'edge', evt => {
                    setTimeout(() => {
                        const id = evt.target.id();
                        const lanes = roadMap.content.lanes;
                        const lane = lanes.find(l => l.id === id);
                        setCurrentLane(lane);
                    }, 0);
                });
                net.on('cxttapend', evt => {
                    if (evt.target === net) {
                        const evtPos = evt.position;
                        setEventX(evtPos.x / container.clientWidth);
                        setEventY(evtPos.y / container.clientHeight);
                        setTimeout(() => {
                            setShowMenu(true);
                        }, 0);
                    }
                });
                setNetwork(net);
            } catch (err) {
                console.log("Could not draw network");
                console.error(err);
            }
        }
    }, [editMap, container, roadMap]);

    useEffect(() => {
        refreshNetwork();
    }, [refreshNetwork]);

    return (<>
            <div className={"button-row"}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setShowAnalysisDialog(true)}>
                    Analyze
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate("analysis")}>
                    Analysis
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        setShowEditor(true);
                        setTimeout(refreshNetwork, 0);
                    }}>
                    Edit
                </Button>
                <Button
                    color="primary"
                    onClick={() => {
                        navigate("..");
                    }}>
                    Back
                </Button>
            </div>
            <div className={"flex-row"}>
                {roadMap && (
                    <div className={"flex-grid network-container"} ref={(element: HTMLElement) => {
                        setContainer(element);
                    }}/>
                )}
                {showEditor && (
                    <div className={"flex-grid"}>
                        <JSONComponent
                            onClose={() => {
                                setShowEditor(false);
                                setTimeout(refreshNetwork, 0);
                            }}
                            visible={showEditor}
                            initialJSON={roadMap?.content || {}}
                            onChange={editMap}
                        />
                    </div>
                )}
                {showMenu && (
                    <RoadMapMenu
                        roadMap={roadMap}
                        x={eventX}
                        y={eventY}
                        onCreateNode={node => addNode(node)}
                        onCreateLane={lane => addLane(lane)}
                        onClose={() => setShowMenu(false)}
                        visible={showMenu}
                    />
                )}
                {showAnalysisDialog && (
                    <AvailableAnalysisDialog
                        projectId={projectId}
                        mapId={roadMap?.uuid}
                        onClose={() => setShowAnalysisDialog(false)}
                        onChooseAnalysis={setChosenAnalysis}
                        visible={showAnalysisDialog}
                    />
                )}
                {chosenAnalysis && (
                    <AnalysisDialog
                        visible={!!chosenAnalysis}
                        projectId={projectId}
                        mapId={roadMap?.uuid}
                        analysis={chosenAnalysis}
                        onClose={() => setChosenAnalysis(null)}
                    />
                )}
                {currentNode && (
                    <RelevantPointEditorDialog
                        roadMap={roadMap}
                        onOk={node => updateNode(node)}
                        onDelete={() => deleteCurrentNode()}
                        onCancel={() => setCurrentNode(null)}
                        element={currentNode}
                    />
                )}
                {currentLane && (
                    <LaneEditorDialog
                        roadMap={roadMap}
                        onOk={lane => updateLane(lane)}
                        onDelete={() => deleteCurrentLane()}
                        onCancel={() => setCurrentLane(null)}
                        element={currentLane}
                    />
                )}
                {/*{configurable && (*/}
                {/*    <ConfigurableDialog*/}
                {/*        visible={!!configurable}*/}
                {/*        onClose={() => setConfigurable(null)}*/}
                {/*        configurable={configurable}*/}
                {/*        properties={smartMap.properties[configurable]}*/}
                {/*        onConfirm={props => {*/}
                {/*            console.log(props);*/}
                {/*            smartMap.addProperties(configurable, props);*/}
                {/*            smartMap.sendUpdates();*/}
                {/*        }}*/}
                {/*    />*/}
                {/*)}*/}
            </div>
        </>
    );
}
