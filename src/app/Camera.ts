import Circle from "./geometry/Circle";
import { Quadrilateral } from "./geometry/Quadrilateral";
import Rectangle from "./geometry/Rectangle";
import Shape from "./geometry/Shape";
import { Drawable } from "./library/Drawable";
import Tile from "./Tile";
import Vector from "./Vector";

export default class Camera implements Drawable {
  private _position: Vector = new Vector();
  private _viewPort: Rectangle;

  constructor() {
    this._viewPort = new Quadrilateral(
      new Vector(Tile.WIDTH * 3, 0),
      new Vector(Tile.WIDTH * 6, Tile.HEIGHT * 3),
      new Vector(Tile.WIDTH * 3, Tile.HEIGHT * 6),
      new Vector(0, Tile.HEIGHT * 3)
    );
  }

  public draw(context: CanvasRenderingContext2D): void {
    this._viewPort.draw(context);
    this.position.draw(context);
  }

  public get viewPort(): Path2D {
    return this._viewPort.path;
  }

  public set screenPosition(position: Vector) {
    this._viewPort.position = position;
  }

  public set position(position: Vector) {
    this._position = position;
  }

  public get position(): Vector {
    return this._position;
  }

  public isInView(shape: Shape): boolean {
    if (shape instanceof Circle) {
      return this._viewPort.translate(this.position.negate()).intersects(shape);
    }
    return false;
  }
}
