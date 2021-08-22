import { Drawable } from "./library/Drawable";
import Sprite from "./Sprite";

export default class SpriteSheet {
  private sprites = new Map<string, Sprite>();
  constructor(
    private image: HTMLImageElement,
    private spriteWidth?: number,
    private spriteHeight?: number
  ) {}

  public define(
    name: string,
    x: number,
    y: number,
    width?: number,
    height?: number,
    originX?: number,
    originY?: number
  ): void {
    const buffer = document.createElement("canvas");
    buffer.width = width ? width : this.spriteWidth;
    buffer.height = height ? height : this.spriteHeight;

    buffer
      .getContext("2d")
      .drawImage(
        this.image,
        x,
        y,
        buffer.width,
        buffer.height,
        0,
        0,
        buffer.width,
        buffer.height
      );

    const sprite = new Sprite(buffer);
    this.sprites.set(name, sprite);
  }

  public get(name: string): Sprite {
    return this.sprites.get(name);
  }
}
