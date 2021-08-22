import Vector, { vectors } from "./Vector";
import { Drawable } from "./library/Drawable";
import Sprite from "./Sprite";
import SpriteSheet from "./SpriteSheet";

export default abstract class Entity implements Drawable {
  private _position = new Vector();
  private _velocity = new Vector();
  private _heading = vectors.NORTH;

  private _currentSprite: Sprite;

  constructor(protected spriteSheet: SpriteSheet) {}

  public set position(position: Vector) {
    this._position = position;
  }

  public get position(): Vector {
    return this._position;
  }

  protected get velocity(): Vector {
    return this._velocity;
  }

  protected set velocity(vector: Vector) {
    this._velocity = vector;
  }

  protected get currentSprite(): Sprite {
    return this._currentSprite;
  }

  protected set currentSprite(sprite: Sprite) {
    this._currentSprite = sprite;
  }

  protected get heading(): Vector {
    return this._heading;
  }

  protected set heading(vector: Vector) {
    this._heading = vector;
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.currentSprite.draw(context, this._position.x, this._position.y);
  }

  public abstract update(deltaTime: number): void;
}
