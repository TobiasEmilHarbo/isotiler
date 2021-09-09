import Vector from "../Vector";
import Shape from "./Shape";

export default class Circle extends Shape {
  constructor(center: Vector, private _radius: number) {
    super();
    this.position = center;
  }

  public get radius(): number {
    return this._radius;
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.strokeStyle = "red";
    context.beginPath();
    context.arc(this.position.x, this.position.y, this._radius, 0, 2 * Math.PI);

    context.stroke();
  }

  public intersects(other: Shape): boolean {
    if (other instanceof Circle) {
      const intersectingDistance = this._radius + other.radius;
      const distance = this.position.distanceTo(other.position);

      return distance - intersectingDistance < 0;
    }

    return false;
  }
}
