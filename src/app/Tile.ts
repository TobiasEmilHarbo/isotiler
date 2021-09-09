import { Rectangle } from "./geometry/Rectangle";
import Shape from "./geometry/Shape";
import { Drawable } from "./library/Drawable";
import Sprite from "./sprites/Sprite";
import Vector from "./Vector";

export default class Tile implements Drawable {
  private _perimeter: Rectangle;

  public static WIDTH: number = 128;
  public static HEIGHT: number = 64;

  constructor(
    private _column: number,
    private _row: number,
    private x: number,
    private y: number,
    private sprite: Sprite
  ) {
    this._perimeter = new Rectangle(
      new Vector(this.x + this.width / 2, this.y),
      new Vector(this.x + this.width, this.y + this.height / 2),
      new Vector(this.x + this.width / 2, this.y + this.height),
      new Vector(this.x, this.y + this.height / 2)
    );
  }

  public get column(): number {
    return this._column;
  }

  public get row(): number {
    return this._row;
  }

  public get width(): number {
    return this.sprite.width;
  }

  public get height(): number {
    return this.sprite.height;
  }

  public get perimeter(): Shape {
    return this._perimeter;
  }

  public get center(): Vector {
    return new Vector(this.x + this.width / 2, this.y + this.height / 2);
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this.sprite.buffer,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
