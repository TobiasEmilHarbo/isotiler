import Vector from "../Vector";
import Shape from "./Shape";

export default class Circle implements Shape {
  constructor(private center: Vector, private radius: number) {}

  public getPosition(): Vector {
    return this.center;
  }

  public setPosition(position: Vector) {
    this.center = position;
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.strokeStyle = "red";
    context.beginPath();
    context.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
    context.stroke();
  }
}
