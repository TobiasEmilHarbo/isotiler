import Vector from "../Vector";
import { Drawable } from "./library/Drawable";
import Sprite from "./Sprite";
import SpriteSheet from "./SpriteSheet";

export default abstract class Entity implements Drawable {
  private _position = new Vector();
  private _velocity = new Vector();
  private _currentSprite: Sprite;

  constructor(protected spriteSheet: SpriteSheet) {}

  public setPosition(position: Vector) {
    this._position = position;
  }

  public getPosition(): Vector {
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

  public draw(context: CanvasRenderingContext2D): void {
    this.currentSprite.draw(context, this._position.x, this._position.y);
  }

  public abstract update(): void;
}
