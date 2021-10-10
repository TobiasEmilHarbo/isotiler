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

  public initialize(type: RoadConnections) {
    for (let i = 0; i < type.length; i++) {
      const connection = type[i];

      for (let j = 0; j < type.length; j++) {
        if (i == j) continue;
        const connection = type[j];
      }
    }
  }

  public initializeRoad(type: RoadConnections) {
    const a = 126.87 / 5;

    const b = 53.13 / 3;

    const innerCorner = [a, a * 2, a * 3, a * 4].map((degrees) => {
      return this.perimeter.C.add(
        this.perimeter.D.subtract(this.perimeter.C)
          .multiply(2 / 8)
          .rotate(degrees)
      );
    });

    const innerCorner2 = [a, a * 2, a * 3, a * 4].map((degrees) => {
      return this.perimeter.A.add(
        this.perimeter.B.subtract(this.perimeter.A)
          .multiply(2 / 8)
          .rotate(degrees)
      );
    });

    const innerCorner3 = [b, b * 2].map((degrees) => {
      return this.perimeter.B.add(
        this.perimeter.C.subtract(this.perimeter.B)
          .multiply(2.5 / 8)
          .rotate(degrees)
      );
    });

    const innerCorner4 = [b, b * 2].map((degrees) => {
      return this.perimeter.D.add(
        this.perimeter.A.subtract(this.perimeter.D)
          .multiply(2.5 / 8)
          .rotate(degrees)
      );
    });

    this.setPath([
      // ...this.innerShallowTurn(
      //   this.perimeter.C,
      //   this.perimeter.D,
      //   this.perimeter.B,
      //   this.perimeter.A
      // ),
      // ...innerCorner,
      // ...innerCorner2,
      // ...innerCorner3,
      // ...innerCorner4,
    ]);

    const outerCorner3 = [b * 2, b].map((degrees) => {
      return this.perimeter.B.add(
        this.perimeter.C.subtract(this.perimeter.B)
          .multiply(2.5 / 8)
          .rotate(degrees)
      ).add(this.perimeter.D.subtract(this.perimeter.B).multiply(2 / 4));
    });

    const outerCorner4 = [b * 2, b].map((degrees) => {
      return this.perimeter.D.add(
        this.perimeter.A.subtract(this.perimeter.D)
          .multiply(2.5 / 8)
          .rotate(degrees)
      ).add(this.perimeter.B.subtract(this.perimeter.D).multiply(2 / 4));
    });

    this.setPath([
      this.ingressPoint(this.perimeter.edges.c),
      this.egressPoint(this.perimeter.edges.b),
      ...this.innerShallowTurn2(this.perimeter.edges.c, this.perimeter.edges.b),
      // this.entryPoint(this.perimeter.C, this.perimeter.D, this.perimeter.B),
      // this.exitPoint(this.perimeter.B, this.perimeter.C, this.perimeter.D),
      // this.entryPoint(this.perimeter.A, this.perimeter.B, this.perimeter.D),
      // this.entryPoint(this.perimeter.D, this.perimeter.A, this.perimeter.C),
      // this.entryPoint(this.perimeter.B, this.perimeter.C, this.perimeter.A),
      // this.entryPoint(this.perimeter.B, this.perimeter.A, this.perimeter.C),
      // this.entryPoint(this.perimeter.C, this.perimeter.B, this.perimeter.D),
      // this.entryPoint(this.perimeter.D, this.perimeter.C, this.perimeter.A),
      // this.entryPoint(this.perimeter.A, this.perimeter.D, this.perimeter.B),
      // this.entryPoint(this.perimeter.A, this.perimeter.B),
      // this.entryPoint(this.perimeter.B, this.perimeter.C),
      // ...this.outerShallowTurn(
      //   this.perimeter.C,
      //   this.perimeter.B,
      //   this.perimeter.A,
      //   this.perimeter.D
      // ),
      // ...outerShallowTurn(
      //   this.perimeter.A,
      //   this.perimeter.D,
      //   this.perimeter.C,
      //   this.perimeter.B
      // ),
      // ...outerCorner2,
      // ...outerCorner3,
      // ...outerCorner4,
    ]);
  }

  private egressPoint(edge: Line): Vector {
    const edgeOrigin = edge.B.subtract(edge.A);
    return edgeOrigin.multiply(5.5 / 8).add(edge.A);
  }

  private ingressPoint(edge: Line): Vector {
    const edgeOrigin = edge.B.subtract(edge.A);
    return edgeOrigin.multiply(2.5 / 8).add(edge.A);
  }

  private enterExitPoint(enter: Vector, inner: Vector, outer: Vector): Vector {
    return enter
      .subtract(inner)
      .multiply(11.5 / 16)
      .add(inner)
      .subtract(enter.subtract(outer).multiply(1 / 8));
  }

  private innerShallowTurn2(
    ingressEdge: Line,
    egressEdge: Line
  ): Array<Vector> {
    const a = 126.87 / 4;

    const turn = [a, a * 2, a * 3].map((degrees) => {
      return ingressEdge.A.add(
        ingressEdge.B.subtract(ingressEdge.A)
          .multiply(4 / 16) //diameter of turn
          .rotate(degrees)
      );
    });
    return turn;
  }

  private innerShallowTurn(
    inner: Vector,
    enter: Vector,
    outer: Vector,
    exit: Vector
  ): Array<Vector> {
    const a = 126.87 / 5;

    const turn = [a, a * 4].map((degrees) => {
      return inner
        .add(
          enter
            .subtract(inner)
            .multiply(5 / 16) //diameter of turn
            .rotate(degrees)
        )
        .add(outer.subtract(inner).multiply(1.5 / 4));
    });
    return turn;
  }

  private outerShallowTurn(
    inner: Vector,
    enter: Vector,
    outer: Vector,
    exit: Vector
  ): Array<Vector> {
    const a = 126.87 / 5;

    const turn = [a, a * 4].map((degrees) => {
      return inner
        .add(
          enter
            .subtract(inner)
            .multiply(4 / 16) //diameter of turn
            .rotate(-degrees)
        )
        .add(outer.subtract(inner).multiply(1.5 / 4));
    });

    const en = this.enterExitPoint(enter, inner, outer);
    const ex = this.enterExitPoint(exit, inner, outer);
    return [en, ...turn, ex];
  }

  public setRoadType(type: RoadConnections) {
    this.roadType = type;
  }

  public set sprite(sprite: Sprite) {
    this._sprite = sprite;
  }
}
