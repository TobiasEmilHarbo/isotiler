import SpriteSheet from "../sprites/SpriteSheet";
import { RoadTile, RoadConnections } from "../tiles/RoadTile";
import Tile, { NullTile } from "../tiles/Tile";
import TileGrid from "../tiles/TileGrid";
import TileResolver from "../tiles/TileResolver";
import { MapPreprocessor } from "./MapPreprocessor";

export class RoadProcessor implements MapPreprocessor {
  constructor(private spriteSheet: SpriteSheet) {
    spriteSheet.setDefaultSpriteSize(Tile.WIDTH, Tile.HEIGHT);

    spriteSheet.define(RoadConnections.STRAIGHT_NW_SE, 0, 0);
    spriteSheet.define(RoadConnections.STRAIGHT_SW_NE, Tile.WIDTH, 0);
    spriteSheet.define(RoadConnections.TURN_NE_SE, Tile.WIDTH * 2, 0);
    spriteSheet.define(RoadConnections.TURN_NE_NW, Tile.WIDTH * 3, 0);
    spriteSheet.define(RoadConnections.DEAD_END_SW, Tile.WIDTH * 4, 0);
    spriteSheet.define(RoadConnections.T_CROSS_NE, 0, Tile.HEIGHT);
    spriteSheet.define(RoadConnections.T_CROSS_NW, Tile.WIDTH, Tile.HEIGHT);
    spriteSheet.define(RoadConnections.TURN_SW_NW, Tile.WIDTH * 2, Tile.HEIGHT);
    spriteSheet.define(RoadConnections.TURN_SW_SE, Tile.WIDTH * 3, Tile.HEIGHT);
    spriteSheet.define(
      RoadConnections.DEAD_END_NW,
      Tile.WIDTH * 4,
      Tile.HEIGHT
    );
    spriteSheet.define(RoadConnections.T_CROSS_SW, 0, Tile.HEIGHT * 2);
    spriteSheet.define(RoadConnections.T_CROSS_SE, Tile.WIDTH, Tile.HEIGHT * 2);
    spriteSheet.define(RoadConnections.CROSS, Tile.WIDTH * 2, Tile.HEIGHT * 2);
    spriteSheet.define(
      RoadConnections.DEAD_END_SE,
      Tile.WIDTH * 3,
      Tile.HEIGHT * 2
    );
    spriteSheet.define(
      RoadConnections.DEAD_END_NE,
      Tile.WIDTH * 4,
      Tile.HEIGHT * 2
    );
  }

  public process(grid: TileGrid): TileGrid {
    const resolver = new TileResolver(grid);

    const isRoadOrNull = function (tile: Tile) {
      return tile instanceof NullTile || tile instanceof RoadTile;
    };

    grid
      .asArray()
      .filter((tile) => tile instanceof RoadTile)
      .forEach((tile: RoadTile) => {
        const adjacentTileSequence = resolver
          .getAdjacentTiles(tile)
          .map((tile): string => (isRoadOrNull(tile) ? "1" : "0"))
          .reduce(
            (sequence: string, type: string) => sequence + type
          ) as RoadConnections;

        tile.sprite = this.spriteSheet.get(adjacentTileSequence);
        tile.initializeRoad(adjacentTileSequence);
      });
    return grid;
  }
}
