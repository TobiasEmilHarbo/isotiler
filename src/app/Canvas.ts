export default class Canvas {
  private canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;

  constructor(height: number, width: number) {
    const ratio = window.devicePixelRatio;
    this.canvas = document.createElement("canvas");
    this.canvas.width = width * ratio;
    this.canvas.height = height * ratio;
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
    this._context = this.canvas.getContext("2d");
    this._context.scale(ratio, ratio);
  }

  public drawSprite(sprite: HTMLCanvasElement, x: number, y: number) {
    this._context.drawImage(
      sprite,
      0,
      0,
      sprite.width,
      sprite.height,
      x,
      y,
      sprite.width,
      sprite.height
    );
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
