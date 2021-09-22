import { Quadrilateral } from "../geometry/Quadrilateral";
import Shape from "../geometry/Shape";
import { Drawable } from "../library/Drawable";
import Sprite from "../sprites/Sprite";
import Vector from "../Vector";
import { TileConfiguration } from "./TileFactory";

export default class Tile implements Drawable {
  private _perimeter: Quadrilateral;

  public static WIDTH: number = 128;
  public static HEIGHT: number = 64;

  private _stickiness: number = 1;
  private _type: string;

  constructor(
    private _column: number,
    private _row: number,
    private x: number,
    private y: number,
    private _sprite: Sprite,
    { stickiness, type }: TileConfiguration
  ) {
    this._perimeter = new Quadrilateral(
      new Vector(this.x + this.width / 2, this.y),
      new Vector(this.x + this.width, this.y + this.height / 2),
      new Vector(this.x + this.width / 2, this.y + this.height),
      new Vector(this.x, this.y + this.height / 2)
    );

    this._stickiness = stickiness ? stickiness : this._stickiness;
    this._type = type;
  }

  public get column(): number {
    return this._column;
  }

  public get row(): number {
    return this._row;
  }

  public get width(): number {
    return this._sprite.width;
  }

  public get height(): number {
    return this._sprite.height;
  }

  public set sprite(sprite: Sprite) {
    this._sprite = sprite;
  }

  public get perimeter(): Shape {
    return this._perimeter;
  }

  public get center(): Vector {
    return new Vector(this.x + this.width / 2, this.y + this.height / 2);
  }

  public get stickiness(): number {
    return this._stickiness;
  }

  public get type(): string {
    return this._type;
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.drawImage(
      this._sprite.buffer,
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

export class NullTile extends Tile {
  constructor() {
    super(0, 0, 0, 0, Sprite.EMPTY, { stickiness: 1, type: null });
  }
}
