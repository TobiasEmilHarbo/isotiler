import { Drawable } from "./library/Drawable";

export default class Canvas {
  private canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    const ratio = window.devicePixelRatio;
    this.canvas = document.createElement("canvas");
    this.canvas.width = width * ratio;
    this.canvas.height = height * ratio;
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
    this._context = this.canvas.getContext("2d");
    this._context.scale(ratio, ratio);
  }

  public drawOnto(context: CanvasRenderingContext2D, x: number, y: number) {
    context.drawImage(this.canvas, x, y);
  }

  public draw(drawable: Drawable) {
    drawable.draw(this.context);
  }

  public get context(): CanvasRenderingContext2D {
    return this._context;
  }

  public appendTo(domElement: HTMLElement) {
    domElement.append(this.canvas);
  }

  public clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
