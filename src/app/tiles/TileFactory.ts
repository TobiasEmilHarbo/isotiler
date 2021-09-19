import Sprite from "../sprites/Sprite";
import Tile from "./Tile";

interface TileConfiguration {
  stickiness: number;
}

export default class TileFactory {
  private tileConfiguration = new Map<string, TileConfiguration>();

  constructor() {
    this.tileConfiguration.set("grass-0", {
      stickiness: 0.75,
    });

    this.tileConfiguration.set("grass-4", {
      stickiness: 1.25,
    });

    this.tileConfiguration.set("field", {
      stickiness: 1.25,
    });
  }
  public getTile(
    tileType: string,
    column: number,
    row: number,
    x: number,
    y: number,
    sprite: Sprite
  ): Tile {
    const { stickiness } = this.tileConfiguration.get(tileType);
    return new Tile(column, row, x, y, sprite, stickiness);
  }
}
