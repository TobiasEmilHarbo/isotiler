import Vector from "../Vector";
import Circle from "./Circle";
import Line from "./Line";
import Shape from "./Shape";

export class Quadrilateral extends Shape {
  constructor(
    private _A: Vector,
    private _B: Vector,
    private _C: Vector,
    private _D: Vector
  ) {
    super();
  }

  public get path(): Path2D {
    const path = new Path2D();
    path.moveTo(this.A.x, this.A.y);
    path.lineTo(this.B.x, this.B.y);
    path.lineTo(this.C.x, this.C.y);
    path.lineTo(this.D.x, this.D.y);
    path.closePath();
    return path;
  }

  private get A(): Vector {
    return this._A.add(this.position);
  }

  private get B(): Vector {
    return this._B.add(this.position);
  }

  private get C(): Vector {
    return this._C.add(this.position);
  }

  private get D(): Vector {
    return this._D.add(this.position);
  }

  private get vertices(): Array<Vector> {
    return [this.A, this.B, this.C, this.D];
  }

  private get edges(): Array<Line> {
    return [
      new Line(this.A, this.B),
      new Line(this.B, this.C),
      new Line(this.C, this.D),
      new Line(this.D, this.A),
    ];
  }

  private getInfinityRayIntersectionCount(point: Vector): number {
    const overlappingVertices = Array<Vector>();
    const ray = new Line(point, new Vector(Infinity, point.y));
    return this.edges.filter((edge: Line) => {
      if (edge.intersects(ray)) {
        if (edge.A.y == point.y) {
          if (!!overlappingVertices.find((point) => point.equalsTo(edge.A)))
            return false;
          overlappingVertices.push(edge.A);
        }

        if (edge.B.y == point.y) {
          if (!!overlappingVertices.find((point) => point.equalsTo(edge.B)))
            return false;
          overlappingVertices.push(edge.B);
        }

        return true;
      }
      return false;
    }).length;
  }

  public intersects(other: Shape): boolean {
    if (other instanceof Quadrilateral) {
      return this.intersectsWithQuadrilateral(other);
    }

    if (other instanceof Circle) {
      return this.intersectsWithCircle(other);
    }

    return false;
  }

  private intersectsWithQuadrilateral(quadrilateral: Quadrilateral): boolean {
    return (
      !!this.vertices.find((vertex: Vector) => {
        return quadrilateral.getInfinityRayIntersectionCount(vertex) == 1;
      }) ||
      !!quadrilateral.vertices.find((vertex: Vector) => {
        return this.getInfinityRayIntersectionCount(vertex) == 1;
      })
    );
  }

  private intersectsWithCircle(circle: Circle): boolean {
    const distances = this.edges.filter((edge: Line) => {
      const projection = circle.position.projectedOnto(edge);
      if (edge.contains(projection)) {
        const distanceToProjection = projection
          .subtract(circle.position)
          .magnitude();
        return distanceToProjection < circle.radius;
      }

      return (
        edge.A.subtract(circle.position).magnitude() < circle.radius ||
        edge.B.subtract(circle.position).magnitude() < circle.radius
      );
    });

    if (distances.length > 0) return true;

    return this.getInfinityRayIntersectionCount(circle.position) == 1;
  }

  public translate(translation: Vector): Quadrilateral {
    const clone = this.clone();
    clone.position = translation;
    return clone;
  }

  private clone(): Quadrilateral {
    return new Quadrilateral(
      this.vertices[0],
      this.vertices[1],
      this.vertices[2],
      this.vertices[3]
    );
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.moveTo(this.A.x, this.A.y);
    context.lineTo(this.B.x, this.B.y);
    context.lineTo(this.C.x, this.C.y);
    context.lineTo(this.D.x, this.D.y);
    context.closePath();
    context.stroke();
  }
}
