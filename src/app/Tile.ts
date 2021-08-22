import { Drawable } from "./library/Drawable";

export default class Tile implements Drawable {
  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
    private sprite: HTMLCanvasElement
  ) {}

  public draw(context: CanvasRenderingContext2D): void {
    const sX = 512 + (this.x - this.y) * 64;
    const sY = (this.x + this.y) * 32;

    context.drawImage(
      this.sprite,
      0,
      0,
      this.width,
      this.height,
      sX,
      sY,
      this.width,
      this.height
    );
  }
}
