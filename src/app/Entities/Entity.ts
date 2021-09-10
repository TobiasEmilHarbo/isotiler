import Vector from "../Vector";
import { Drawable } from "../library/Drawable";
import Sprite from "../sprites/Sprite";
import SpriteSheet from "../sprites/SpriteSheet";
import Trait from "../Traits/Trait";
import Shape from "../geometry/Shape";
import Circle from "../geometry/Circle";

export default abstract class Entity implements Drawable {
  private _position = new Vector();
  private _velocity = new Vector();
  private _heading = Vector.NORTH;
  private _sprite: Sprite = Sprite.EMPTY;

  protected _hitBox: Shape;

  private traits = new Array<Trait>();

  constructor(
    protected spriteSheet: SpriteSheet,
    protected entities: Array<Entity>
  ) {
    this._hitBox = new Circle(this.position, 0);
  }

  public set position(position: Vector) {
    this._hitBox.position = position;
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

  public get hitBox(): Shape {
    return this._hitBox;
  }

  public setSprite(spriteName: string) {
    const newSprite = this.spriteSheet.get(spriteName);
    if (!newSprite) return;
    this.sprite = newSprite;
  }

  public addTrait(trait: Trait): void {
    this.traits.push(trait);
  }

  public draw(
    context: CanvasRenderingContext2D,
    offsetX?: number,
    offsetY?: number
  ): void {
    this.sprite.draw(
      context,
      this._position.x + offsetX,
      this._position.y + offsetY
    );
  }

  public update(deltaTime: number): void {
    for (let index = this.traits.length - 1; index >= 0; index--) {
      const trait = this.traits[index];
      trait.update(this, deltaTime);
    }
  }
}
