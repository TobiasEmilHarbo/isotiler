import { Drawable } from "../library/Drawable";
import Vector from "../Vector";

export default abstract class Shape implements Drawable {
  private _position: Vector;

  public set position(position: Vector) {
    this._position = position;
  }

  public get position(): Vector {
    return this._position;
  }

  public abstract intersects(other: Shape): boolean;

  public abstract draw(
    context: CanvasRenderingContext2D,
    x?: number,
    y?: number
  ): void;
}
