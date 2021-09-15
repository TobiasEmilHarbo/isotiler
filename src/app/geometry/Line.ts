import { Drawable } from "../library/Drawable";
import Vector from "../Vector";

export default class Line implements Drawable {
  constructor(private _A: Vector, private _B: Vector) {}

  public get A() {
    return this._A;
  }

  public get B() {
    return this._B;
  }

  private getSlope(): number {
    const xDifference = this.A.x - this.B.x;
    if (xDifference == 0) return Infinity;
    return (this.A.y - this.B.y) / xDifference;
  }

  private isParallelTo(other: Line): boolean {
    return this.getSlope().equals(other.getSlope());
  }

  public intersects(other: Line): boolean {
    if (this.isParallelTo(other)) return false;
    const orientation1 = this.A.orientationInRelationTo(other);
    const orientation2 = this.B.orientationInRelationTo(other);
    const orientation3 = other.A.orientationInRelationTo(this);
    const orientation4 = other.B.orientationInRelationTo(this);
    return orientation1 != orientation2 && orientation3 != orientation4;
  }

  public contains(C: Vector): boolean {
    const lineBC = new Line(this.B, C);

    if (!lineBC.isParallelTo(this)) return false;

    return (
      Math.min(this.A.x, this.B.x).lessThanOrEqualTo(C.x) &&
      Math.max(this.A.x, this.B.x).greaterThanOrEqualTo(C.x) &&
      Math.min(this.A.y, this.B.y).lessThanOrEqualTo(C.y) &&
      Math.max(this.A.y, this.B.y).greaterThanOrEqualTo(C.y)
    );
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.A.draw(context);

    context.moveTo(this.A.x, this.A.y);
    context.lineTo(this.B.x, this.B.y);
    context.closePath();

    context.stroke();
  }
}
