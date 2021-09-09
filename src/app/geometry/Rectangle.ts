import Vector from "../Vector";
import Shape from "./Shape";

export class Rectangle extends Shape {
  constructor(
    private A: Vector,
    private B: Vector,
    private C: Vector,
    private D: Vector
  ) {
    super();
  }

  public intersects(other: Shape): boolean {
    throw new Error("Method not implemented.");
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.strokeStyle = "orange";
    context.beginPath();
    context.moveTo(this.A.x, this.A.y);
    context.lineTo(this.B.x, this.B.y);
    context.lineTo(this.C.x, this.C.y);
    context.lineTo(this.D.x, this.D.y);
    context.closePath();
    context.stroke();
  }
}
