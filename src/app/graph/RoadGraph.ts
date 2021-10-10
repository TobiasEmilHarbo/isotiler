import { Graph } from "./graph";
import { GraphEdge } from "./GraphEdge";
import Tile from "../tiles/Tile";
import TileGrid from "../tiles/TileGrid";
import TileResolver from "../tiles/TileResolver";

interface Node {
  nodeTile: Tile;
  edgeSequence: Array<string>;
}
export class RoadGraph extends Graph<Tile> {
  private tileResolver: TileResolver;

  constructor(private tiles: TileGrid) {
    super();

    this.tileResolver = new TileResolver(tiles);

    this.tiles.asArray().forEach((tile) => {
      if (tile.type != "road") {
        return;
      }

      if (!this.isNodeTile(tile)) {
        return;
      }

      this.traverseRoadNetwork(tile);
    });
  }

  private traverseRoadNetwork(currentTile: Tile, previousTile?: Tile) {
    previousTile = !previousTile ? currentTile : previousTile;

    const { nodeTile, edgeSequence } = this.findNextNode(
      previousTile,
      currentTile
    );

    const roadConnections = this.tileResolver.getAdjacentTiles(
      nodeTile,
      "road"
    );

    const weight = edgeSequence.length - 1;
    const edgeId = edgeSequence
      .sort()
      .reduce((sequence: string, id: string) => sequence + id, "");

    if (this.hasEdge(edgeId)) {
      return;
    }

    if (previousTile !== nodeTile) {
      this.addEdge(previousTile, nodeTile, weight, edgeId);
    }

    roadConnections.forEach((connection: Tile) => {
      this.traverseRoadNetwork(connection, nodeTile);
    });
  }

  private isNodeTile(tile: Tile): boolean {
    return this.tileResolver.getAdjacentTiles(tile, "road").length != 2;
  }

  private findNextNode(
    previous: Tile,
    current: Tile,
    edgeSequence?: Array<string>
  ): Node {
    edgeSequence = !edgeSequence ? [previous.id] : edgeSequence;

    edgeSequence.push(current.id);

    const adjacentRoadTiles = this.tileResolver.getAdjacentTiles(
      current,
      "road"
    );

    if (adjacentRoadTiles.length == 2) {
      const nextTile = adjacentRoadTiles.find((tile) => tile != previous);
      return this.findNextNode(current, nextTile, edgeSequence);
    }

    return {
      nodeTile: current,
      edgeSequence,
    };
  }
}
