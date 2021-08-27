import Vector from "../Vector";
import { Drawable } from "../library/Drawable";
import Sprite from "../Sprite";
import SpriteSheet from "../SpriteSheet";
import Trait from "../Traits/Trait";

export default abstract class Entity implements Drawable {
  private _position = new Vector();
  private _velocity = new Vector();
  private _heading = Vector.NORTH;
  private _sprite: Sprite = Sprite.EMPTY;

  private traits = new Array<Trait>();

  constructor(protected spriteSheet: SpriteSheet) {}

  public set position(position: Vector) {
    this._position = position;
  }

  public get position(): Vector {
    return this._position;
  }

  public get velocity(): Vector {
    return this._velocity;
  }

  public set velocity(vector: Vector) {
    this._velocity = vector;
  }

  public get heading(): Vector {
    return this._heading;
  }

  public set heading(vector: Vector) {
    this._heading = vector;
  }

  public get sprite(): Sprite {
    return this._sprite;
  }

  public set sprite(sprite: Sprite) {
    this._sprite = sprite;
  }

  public setSprite(spriteName: string) {
    const newSprite = this.spriteSheet.get(spriteName);
    if (!newSprite) return;
    this.sprite = newSprite;
  }

  public addTrait(trait: Trait): void {
    this.traits.push(trait);
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.sprite.draw(context, this._position.x, this._position.y);
  }

  public update(deltaTime: number): void {
    for (let index = this.traits.length - 1; index >= 0; index--) {
      const trait = this.traits[index];
      trait.update(this, deltaTime);
    }
  }
}
