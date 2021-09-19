import Entity from "./Entities/Entity";
import Circle from "./geometry/Circle";
import Line from "./geometry/Line";
import { Quadrilateral } from "./geometry/Quadrilateral";
import Rectangle from "./geometry/Rectangle";
import Shape from "./geometry/Shape";
import { Drawable } from "./library/Drawable";
import Tile from "./tiles/Tile";
import Vector from "./Vector";

export default class Camera implements Drawable {
  private _position: Vector = new Vector();
  private _focus = new Circle(new Vector(), Tile.HEIGHT * 1.5);
  private _screen: Rectangle;

  private entityInFocus: Entity;

  constructor() {
    this._screen = new Quadrilateral(
      new Vector(Tile.WIDTH * 3.5, 0),
      new Vector(Tile.WIDTH * 7, Tile.HEIGHT * 3.5),
      new Vector(Tile.WIDTH * 3.5, Tile.HEIGHT * 7),
      new Vector(0, Tile.HEIGHT * 3.5)
    );
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.strokeStyle = "red";

    this._screen.draw(context);
    this.position.draw(context);
    this._focus.draw(context);

    if (!this.entityInFocus) return;

    const entityInFocusInScreenCoordinates = this.entityInFocus.position.add(
      this.position.negate()
    );

    context.strokeStyle = "blue";

    const line = new Line(this.focus, entityInFocusInScreenCoordinates);

    line.draw(context);

    const cameraTranslation = entityInFocusInScreenCoordinates
      .subtract(this.focus)
      .setLength(this.focusRadius)
      .add(this.focus);

    entityInFocusInScreenCoordinates.subtract(this.focus).magnitude;

    cameraTranslation.draw(context);
  }

  public get screen(): Path2D {
    return this._screen.path;
  }

  public set screenPosition(position: Vector) {
    this._screen.position = position;
    this._focus.position = position.add(
      new Vector(Tile.WIDTH * 3.5, Tile.HEIGHT * 3.5)
    );
  }

  public get focusRadius(): number {
    return this._focus.radius;
  }

  public get focus(): Vector {
    return this._focus.position;
  }

  public set position(position: Vector) {
    this._position = position;
  }

  public get position(): Vector {
    return this._position;
  }

  public isInView(shape: Shape): boolean {
    if (shape instanceof Circle) {
      return this._screen.translate(this.position).intersects(shape);
    }
    return false;
  }

  public setEntityInFocus(entity: Entity) {
    this.entityInFocus = entity;

    const entityInFocusInScreenCoordinates = this.entityInFocus.position.add(
      this.position.negate()
    );

    const cameraTranslation = entityInFocusInScreenCoordinates.subtract(
      this.focus
    );

    this.position = this.position.add(cameraTranslation);
  }

  public update(deltaTime: number) {
    if (!this.entityInFocus) return;

    const entityInScreenCoordinates = this.entityInFocus.position.add(
      this.position.negate()
    );

    const distanceToEntityInFocus = this.focus.distanceTo(
      entityInScreenCoordinates
    );

    if (!distanceToEntityInFocus.lessThan(this.focusRadius)) {
      const lengthOutOfFocus =
        entityInScreenCoordinates.subtract(this.focus).magnitude -
        this.focusRadius;

      const toFocus = entityInScreenCoordinates
        .subtract(this.focus)
        .setLength(lengthOutOfFocus);

      this.position = this.position.add(toFocus);
    }
  }
}
