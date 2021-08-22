import { Drawable } from "./library/Drawable";
import Sprite from "./Sprite";
import Vector from "./Vector";

export default class Tile implements Drawable {
  private A: Vector;
  private B: Vector;
  private C: Vector;
  private D: Vector;

  constructor(private x: number, private y: number, private sprite: Sprite) {
    this.A = new Vector(this.x + this.width / 2, this.y);
    this.B = new Vector(this.x + this.width, this.y + this.height / 2);
    this.C = new Vector(this.x + this.width / 2, this.y + this.height);
    this.D = new Vector(this.x, this.y + this.height / 2);
  }

  public get width() {
    return this.sprite.width;
  }

  public get height() {
    return this.sprite.height;
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

    context.strokeStyle = "orange";
    context.beginPath();
    context.moveTo(this.A.x, this.A.y);
    context.lineTo(this.B.x, this.B.y);
    context.lineTo(this.C.x, this.C.y);
    context.lineTo(this.D.x, this.D.y);
    context.closePath();
    context.stroke();
  }
}
