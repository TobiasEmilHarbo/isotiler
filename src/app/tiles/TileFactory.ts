import Sprite from "../sprites/Sprite";
import { RoadTile } from "./RoadTile";
import Tile, { NullTile } from "./Tile";

export interface TileConfiguration {
  type: string;
  stickiness: number;
}

export default class TileFactory {
  private tileConfiguration = new Map<string, TileConfiguration>();

  constructor() {
    this.tileConfiguration.set("grass", {
      type: "grass",
      stickiness: 0.75,
    });

    this.tileConfiguration.set("dry-grass", {
      type: "dry-grass",
      stickiness: 1.25,
    });

    this.tileConfiguration.set("road", {
      type: "road",
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
    let configuration = this.tileConfiguration.get(tileType);

    if (tileType == "road") {
      return new RoadTile(column, row, x, y, sprite, configuration);
    }
    return new Tile(column, row, x, y, sprite, configuration);
  }
}
