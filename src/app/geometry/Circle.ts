import Vector from "../Vector";
import { Quadrilateral } from "./Quadrilateral";
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
    context.beginPath();
    context.arc(this.position.x, this.position.y, this._radius, 0, 2 * Math.PI);
    context.stroke();

    this.position.draw(context);
  }

  private intersectsWithQuadrilateral(other: Quadrilateral): boolean {
    return other.intersects(this);
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

  protected intersectsWithCircle(other: Circle): boolean {
    const intersectingDistance = this._radius + other.radius;
    const distance = this.position.distanceTo(other.position);

    return distance - intersectingDistance < 0;
  }
}
