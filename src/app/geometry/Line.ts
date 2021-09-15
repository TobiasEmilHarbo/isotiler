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
    const xDifference = this._A.x - this._B.x;
    if (xDifference == 0) return Infinity;
    return (this._A.y - this._B.y) / xDifference;
  }

  private isParallelTo(other: Line): boolean {
    return this.getSlope().equals(other.getSlope());
  }

  public intersects(other: Line): boolean {
    if (this.isParallelTo(other)) return false;
    const o1 = this._A.orientationInRelationTo(other);
    const o2 = this._B.orientationInRelationTo(other);
    const o3 = other.A.orientationInRelationTo(this);
    const o4 = other.B.orientationInRelationTo(this);
    return o1 != o2 && o3 != o4;
  }

  public contains(C: Vector): boolean {
    const lineBC = new Line(this.B, C);

    if (!lineBC.isParallelTo(this)) return false;

    return (
      Math.min(this.A.x, this.B.x) <= C.x &&
      C.x <= Math.max(this.A.x, this.B.x) &&
      Math.min(this.A.y, this.B.y) <= C.y &&
      C.y <= Math.max(this.A.y, this.B.y)
    );
  }

  public draw(context: CanvasRenderingContext2D): void {
    this._A.draw(context);

    context.moveTo(this._A.x, this._A.y);
    context.lineTo(this._B.x, this._B.y);
    context.closePath();

    context.stroke();
  }
}
