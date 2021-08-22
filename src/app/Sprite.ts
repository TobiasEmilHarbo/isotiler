import Vector from "./Vector";
import { Drawable } from "./library/Drawable";

export default class Sprite implements Drawable {
  constructor(
    private _buffer: HTMLCanvasElement,
    private origin: Vector = new Vector()
  ) {}

  public get buffer(): HTMLCanvasElement {
    return this._buffer;
  }

  public get width(): number {
    return this._buffer.width;
  }

  public get height(): number {
    return this._buffer.height;
  }

  public draw(context: CanvasRenderingContext2D, x: number, y: number): void {
    context.drawImage(this._buffer, x - this.origin.x, y - this.origin.y);
  }
}
