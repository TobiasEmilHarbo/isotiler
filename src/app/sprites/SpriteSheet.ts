import Vector from "./../Vector";
import Sprite from "./Sprite";

export default class SpriteSheet {
  private sprites = new Map<string, Sprite>();
  private groups = new Map<string, Array<string>>();

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

  public defineInGroup(name: string, x: number, y: number) {
    let group = this.groups.get(name);
    if (!group) {
      group = new Array<string>();
      this.groups.set(name, group);
    }

    const spriteName = `${name}-${group.length}`;
    this.define(spriteName, x, y);

    group.push(spriteName);
  }

  public getRandomFromGroup(group: Array<string>): Sprite {
    const groupSize = group?.length;

    const index = Math.floor(Math.random() * (groupSize - 0));

    const sprite = this.sprites.get(group[index]);
    return sprite ? sprite : Sprite.EMPTY;
  }

  public get(name: string): Sprite {
    const group = this.groups.get(name);
    if (!!group) return this.getRandomFromGroup(group);

    const sprite = this.sprites.get(name);
    return sprite ? sprite : Sprite.EMPTY;
  }
}
