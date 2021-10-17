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

  public get A(): Vector {
    return this._A.add(this.position);
  }

  public get B(): Vector {
    return this._B.add(this.position);
  }

  public get C(): Vector {
    return this._C.add(this.position);
  }

  public get D(): Vector {
    return this._D.add(this.position);
  }

  private get vertices(): Array<Vector> {
    return [this.A, this.B, this.C, this.D];
  }

  public get edges(): Array<Line> {
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
      if (!edge.intersects(ray)) return false;

      if (edge.A.y.equals(point.y)) {
        if (!!overlappingVertices.find((point) => point.equalsTo(edge.A))) {
          return false;
        }
        overlappingVertices.push(edge.A);
      }

      if (edge.B.y.equals(point.y)) {
        if (!!overlappingVertices.find((point) => point.equalsTo(edge.B))) {
          return false;
        }
        overlappingVertices.push(edge.B);
      }

      return true;
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
    const intersectedVertices = new Set();

    const ray = new Line(
      circle.position,
      new Vector(Infinity, circle.position.y)
    );

    let rayIntersections = 0;

    const edgeIntersections = this.edges.find((edge: Line) => {
      if (edge.A.subtract(circle.position).magnitude.lessThan(circle.radius)) {
        return true;
      }

      const projection = circle.position.projectedOnto(edge);

      if (
        edge.contains(projection) &&
        projection
          .subtract(circle.position)
          .magnitude.lessThanOrEqualTo(circle.radius)
      ) {
        return true;
      }

      if (!ray.intersects(edge)) return false;

      if (edge.A.y.equals(circle.position.y)) {
        if (!intersectedVertices.has(edge.A.toString())) {
          rayIntersections++;
          intersectedVertices.add(edge.A.toString());
        }
      } else if (edge.B.y.equals(circle.position.y)) {
        if (!intersectedVertices.has(edge.B.toString())) {
          rayIntersections++;
          intersectedVertices.add(edge.B.toString());
        }
      } else {
        rayIntersections++;
      }

      return false;
    });

    return !!edgeIntersections || rayIntersections == 1;
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
