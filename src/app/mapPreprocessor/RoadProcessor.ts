import Sprite from "../sprites/Sprite";
import SpriteSheet from "../sprites/SpriteSheet";
import Tile, { NullTile } from "../tiles/Tile";
import TileGrid from "../tiles/TileGrid";
import TileResolver from "../tiles/TileResolver";
import { MapPreprocessor } from "./MapPreprocessor";

export class RoadProcessor implements MapPreprocessor {
  constructor(private spriteSheet: SpriteSheet) {
    spriteSheet.setDefaultSpriteSize(128, 64);

    spriteSheet.define("straight-1", 0, 0);
    spriteSheet.define("straight-2", 128, 0);
    spriteSheet.define("turn-1", 256, 0);
    spriteSheet.define("t-cross-1", 0, 64);
    spriteSheet.define("t-cross-2", 128, 64);
    spriteSheet.define("turn-2", 256, 64);
    spriteSheet.define("t-cross-3", 0, 128);
    spriteSheet.define("t-cross-4", 128, 128);
    spriteSheet.define("cross", 256, 128);
  }
  public process(grid: TileGrid): TileGrid {
    const resolver = new TileResolver(grid);

    const isRoadOrNull = function (tile: Tile) {
      return tile instanceof NullTile || tile.type == "road";
    };

    grid
      .asArray()
      .filter((tile) => isRoadOrNull(tile))
      .forEach((tile) => {
        const adjacentTileSequence = resolver
          .getAdjacentTiles(tile)
          .map((tile): string => (isRoadOrNull(tile) ? "1" : "0"))
          .reduce((prev: string, curr: string): string => prev + curr);

        switch (adjacentTileSequence) {
          // case "0001":
          //   tile.sprite = this.spriteSheet.get("straight-1");
          //   break;
          // case "0010":
          //   tile.sprite = this.spriteSheet.get("straight-2");
          //   break;
          case "0011":
            tile.sprite = this.spriteSheet.get("turn-2");
            break;
          // case "0100":
          //   tile.sprite = this.spriteSheet.get("straight-1");
          //   break;
          case "0101":
            tile.sprite = this.spriteSheet.get("straight-1");
            break;
          // case "0110":
          //   tile.sprite = this.spriteSheet.get("t-cross-3");
          //   break;
          case "0111":
            tile.sprite = this.spriteSheet.get("t-cross-3");
            break;
          case "1000":
            tile.sprite = this.spriteSheet.get("straight-2");
            break;
          // case "1001":
          //   tile.sprite = this.spriteSheet.get("t-cross-2");
          //   break;
          case "1010":
            tile.sprite = this.spriteSheet.get("straight-2");
            break;
          case "1011":
            tile.sprite = this.spriteSheet.get("t-cross-2");
            break;
          case "1100":
            tile.sprite = this.spriteSheet.get("turn-1");
            break;
          case "1101":
            tile.sprite = this.spriteSheet.get("t-cross-1");
            break;
          // case "1110":
          //   tile.sprite = this.spriteSheet.get("t-cross-1");
          //   break;
          case "1111":
            tile.sprite = this.spriteSheet.get("cross");
            break;
        }
      });
    return grid;
  }
}
