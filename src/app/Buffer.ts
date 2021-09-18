import { Drawable } from "./library/Drawable";

export default class Buffer {
  private canvas = document.createElement("canvas");

  constructor(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  public get context(): CanvasRenderingContext2D {
    return this.canvas.getContext("2d");
  }

  public draw(drawable: Drawable) {
    drawable.draw(this.context);
  }

  public drawOnTo(context: CanvasRenderingContext2D, x: number, y: number) {
    context.drawImage(this.canvas, x, y);
  }
}
