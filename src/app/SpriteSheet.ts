import Vector from "./Vector";
import Sprite from "./Sprite";

export default class SpriteSheet {
  private sprites = new Map<string, Sprite>();
  constructor(
    private image: HTMLImageElement,
    private defaultSpriteWidth?: number,
    private defaultSpriteHeight?: number
  ) {}

  public setDefaultSpriteSize(width: number, height: number) {
    this.defaultSpriteWidth = width;
    this.defaultSpriteHeight = height;
  }

  public define(
    name: string,
    x: number,
    y: number,
    width?: number,
    height?: number,
    origin?: Vector
  ): void {
    const buffer = document.createElement("canvas");
    buffer.width = width ? width : this.defaultSpriteWidth;
    buffer.height = height ? height : this.defaultSpriteHeight;

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

    const sprite = new Sprite(buffer, origin);
    this.sprites.set(name, sprite);
  }

  public get(name: string): Sprite {
    return this.sprites.get(name);
  }
}
