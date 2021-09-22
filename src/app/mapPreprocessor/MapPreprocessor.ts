import TileGrid from "../tiles/TileGrid";

export interface MapPreprocessor {
  process(grid: TileGrid): TileGrid;
}
