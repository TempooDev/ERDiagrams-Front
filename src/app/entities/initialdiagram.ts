import { EntityDB } from "./entitydb";
import { RelationShip } from "./relationship";

export interface InitialDiagram {
    diagram: go.Diagram,
    nodes: Array<EntityDB>,
    links: Array<RelationShip>
}