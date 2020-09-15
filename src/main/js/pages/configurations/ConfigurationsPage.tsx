import React, {useCallback, useContext, useEffect, useState} from "react";
import Page from "../Page";
import {Button, Card, CardActions, CardContent, Fab, Grid, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "../../utils/useStyles";
import {RouteComponentProps} from "@reach/router";
import ApiContext from "../../ApiContext";
import {ConfigurableCategory, ItemConfiguration} from "../../api/generated";
import SelectEditor from "../../inputs/SelectEditor";
import ConfigurationEditor from "./ConfigurationEditor";
import {renderProperty} from "./properties/inputs/PropertyInput";

export default function ConfigurationsPage({navigate}: RouteComponentProps) {
    const classes = useStyles();
    const {configurationsApi} = useContext(ApiContext);

    const [categories, setCategories] = useState<Array<ConfigurableCategory>>([]);
    const [category, setCategory] = useState<ConfigurableCategory>(null);

    const [configurations, setConfigurations] = useState<Array<ItemConfiguration>>([]);
    const [configuration, setConfiguration] = useState<ItemConfiguration>(null);

    useEffect(() => {
        configurationsApi.getConfigurationCategories().then(response => {
            setCategories(response.data);
        });
    }, [configurationsApi]);

    const loadConfigurations = useCallback((category) => {
        configurationsApi.getConfigurations(category?.name).then(response => {
            setConfigurations(response.data);
        });
    }, [configurationsApi]);

    useEffect(() => {
        loadConfigurations(category);
    }, [category, loadConfigurations]);

    async function deleteConfiguration(config: ItemConfiguration) {
        configurationsApi.removeConfiguration(config.uuid).then(() => loadConfigurations(category));
    }

    return (
        <Page title="Configurations">
            <SelectEditor<ConfigurableCategory>
                optionId={option => option.name}
                optionLabel={option => option.description}
                options={categories}
                value={category}
                disabled={false}
                label={"Category"}
                multiSelect={false}
                onSelectOption={option => setCategory(option)}>
            </SelectEditor>
            {category && (<Fab
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={() => setConfiguration({
                    name: "",
                    category: category.name,
                    props: []
                })}>
                <AddIcon/>
            </Fab>)}
            <Grid container spacing={1}>
                {configurations.map(conf => (
                    <Grid key={conf.uuid} item xs={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5">{conf.name}</Typography>
                                {conf.props.map(property => (
                                    <Typography key={property.name + property.propertyType} variant="h6">
                                        {`${property.name}: ${renderProperty(property)}`}
                                    </Typography>
                                ))}
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => setConfiguration(conf)}>
                                    Edit
                                </Button>
                                <Button size="small" onClick={() => deleteConfiguration(conf)}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {configuration && (
                <ConfigurationEditor
                    category={configuration?.category}
                    configuration={configuration}
                    onConfirm={() => {
                        setConfiguration(null);
                        loadConfigurations(category);
                    }}
                    onAbort={() => setConfiguration(null)}
                />
            )}
        </Page>
    );
}
