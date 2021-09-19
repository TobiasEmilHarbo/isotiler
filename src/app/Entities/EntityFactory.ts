import { EntitySpriteSheets } from "../sprites/EntitySpriteSheets";
import TileGrid from "../tiles/TileGrid";
import { Entities } from "./Entities";
import Entity from "./Entity";
import GarbageTruck from "./GarbageTruck";
import { Tree } from "./Tree";

export class EntityFactory {
  constructor(
    private spriteSheets: EntitySpriteSheets,
    private tileGrid: TileGrid,
    private entities: Array<Entity>
  ) {}

  public getEntity(name: Entities) {
    switch (name) {
      case Entities.GARBAGE_TRUCK:
        return new GarbageTruck(
          this.spriteSheets[name],
          this.tileGrid,
          this.entities
        );
      case Entities.TREE:
        return new Tree(this.spriteSheets[name], this.tileGrid, this.entities);
    }
  }
}
