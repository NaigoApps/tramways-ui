import {
  Configurable,
  Lane,
  Property,
  RelevantPoint,
  RoadMap
} from "../../../api/generated/projects";

export function roadMapPoints(roadMap: RoadMap): RelevantPoint[] {
  return roadMap?.points || [];
}

export function roadMapLanes(roadMap: RoadMap): Lane[] {
  return roadMap?.lanes || [];
}

export function configurableProps(c: Configurable): Property[] {
  if (!c.props) {
    c.props = [];
  }
  return c.props;
}
