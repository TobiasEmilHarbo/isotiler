import Line from "../geometry/Line";
import Sprite from "../sprites/Sprite";
import Vector from "../Vector";
import Tile from "./Tile";
import { TileConfiguration } from "./TileFactory";

export enum RoadConnections {
  DEAD_END_NW = "0001",
  DEAD_END_SW = "0010",
  TURN_SW_NW = "0011",
  DEAD_END_SE = "0100",
  STRAIGHT_NW_SE = "0101",
  TURN_SW_SE = "0110",
  T_CROSS_SW = "0111",
  DEAD_END_NE = "1000",
  TURN_NE_NW = "1001",
  STRAIGHT_SW_NE = "1010",
  T_CROSS_NW = "1011",
  TURN_NE_SE = "1100",
  T_CROSS_NE = "1101",
  T_CROSS_SE = "1110",
  CROSS = "1111",
}

export class RoadTile extends Tile {
  private roadType: RoadConnections;
  private path: Array<Vector> = [];
  private paths = new Map<string, Array<Vector>>();

  constructor(
    column: number,
    row: number,
    x: number,
    y: number,
    sprite: Sprite,
    configuration: TileConfiguration
  ) {
    super(column, row, x, y, sprite, configuration);
  }

  public initialize(connections: RoadConnections) {
    for (
      let ingressEdgeIndex = 0;
      ingressEdgeIndex < connections.length;
      ingressEdgeIndex++
    ) {
      if ("0" == connections[ingressEdgeIndex]) continue;

      for (
        let egressEdgeIndex = 0;
        egressEdgeIndex < connections.length;
        egressEdgeIndex++
      ) {
        if ("0" == connections[egressEdgeIndex]) continue;
        if (ingressEdgeIndex == egressEdgeIndex) continue;

        const pathId = this.getPathId(ingressEdgeIndex, egressEdgeIndex);
        const path = this.generatePath(ingressEdgeIndex, egressEdgeIndex);
        this.paths.set(pathId, path);
      }
    }
  }

  private getPathId(ingressEdgeIndex: number, egressEdgeIndex: number): string {
    const adjacentCoordinates = this.getAdjacentTileCoordinates();

    const { column: ingressColumn, row: ingressRow } =
      adjacentCoordinates[ingressEdgeIndex];
    const { column: egressColumn, row: egressRow } =
      adjacentCoordinates[egressEdgeIndex];

    return (
      String(ingressColumn) +
      String(ingressRow) +
      String(egressColumn) +
      String(egressRow)
    );
  }

  private generatePath(
    ingressEdgeIndex: number,
    egressEdgeIndex: number
  ): Array<Vector> {
    const ingressEdge = this.perimeter.edges[ingressEdgeIndex];
    const egressEdge = this.perimeter.edges[egressEdgeIndex];

    const path = Array<Vector>();

    path.push(this.ingressPoint(ingressEdge));

    if (isTurn(ingressEdgeIndex, egressEdgeIndex)) {
      if (Math.abs(ingressEdgeIndex - egressEdgeIndex) == 3) {
        if (ingressEdgeIndex < egressEdgeIndex) {
          path.push(
            ...this.innerTurn(
              this.perimeter.edges[ingressEdgeIndex],
              this.perimeter.edges[egressEdgeIndex]
            )
          );
        } else {
          path.push(
            ...this.outerTurn(
              this.perimeter.edges[ingressEdgeIndex],
              this.perimeter.edges[egressEdgeIndex]
            )
          );
        }
      } else if (ingressEdgeIndex > egressEdgeIndex) {
        path.push(
          ...this.innerTurn(
            this.perimeter.edges[ingressEdgeIndex],
            this.perimeter.edges[egressEdgeIndex]
          )
        );
      } else {
        path.push(
          ...this.outerTurn(
            this.perimeter.edges[ingressEdgeIndex],
            this.perimeter.edges[egressEdgeIndex]
          )
        );
      }
    }

    path.push(this.egressPoint(egressEdge));

    return path;
  }

  public initializeRoad(type: RoadConnections) {
    this.initialize(type);
  }

  private egressPoint(edge: Line): Vector {
    const edgeOrigin = edge.B.subtract(edge.A);
    return edgeOrigin.multiply(5.5 / 8).add(edge.A);
  }

  private ingressPoint(edge: Line): Vector {
    const edgeOrigin = edge.B.subtract(edge.A);
    return edgeOrigin.multiply(2.5 / 8).add(edge.A);
  }

  private innerTurn(ingressEdge: Line, egressEdge: Line): Array<Vector> {
    const angleBetweenEdges = egressEdge.A.subtract(egressEdge.B).angleBetween(
      ingressEdge.B.subtract(ingressEdge.A)
    );

    let turn;

    if (angleBetweenEdges > 90) {
      const step = angleBetweenEdges / 4;

      turn = [step, step * 2, step * 3].map((degrees) => {
        return ingressEdge.A.add(
          ingressEdge.B.subtract(ingressEdge.A)
            .multiply(8 / 32) //diameter of turn
            .rotate(degrees)
        );
      });
    } else {
      const step = angleBetweenEdges / 3;

      turn = [step, step * 2].map((degrees) => {
        return ingressEdge.A.add(
          ingressEdge.B.subtract(ingressEdge.A)
            .multiply(12 / 32) //diameter of turn
            .rotate(degrees)
        );
      });
    }

    return turn;
  }

  private outerTurn(ingressEdge: Line, egressEdge: Line): Array<Vector> {
    const turn = [
      this.egressPoint(ingressEdge),
      ...this.innerTurn(egressEdge, ingressEdge),
      this.ingressPoint(egressEdge),
    ].map((point) =>
      point
        .add(ingressEdge.A.subtract(ingressEdge.B).multiply(6.5 / 16))
        .add(egressEdge.B.subtract(egressEdge.A).multiply(6.5 / 16))
    );

    return turn.reverse();
  }

  public setPath(path: Array<Vector>) {
    this.path = path;
  }

  public getPaths(fromTile?: Tile, toTile?: Tile): IterableIterator<Vector[]> {
    return this.paths.values();
  }

  public setRoadType(type: RoadConnections) {
    this.roadType = type;
  }

  public set sprite(sprite: Sprite) {
    this._sprite = sprite;
  }
}

const isTurn = (ingressEdgeIndex: number, egressEdgeIndex: number): boolean => {
  return !((ingressEdgeIndex + egressEdgeIndex) % 2 == 0);
};
