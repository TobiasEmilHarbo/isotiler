import { EntitySpriteSheets } from "../sprites/EntitySpriteSheets";
import { Entities } from "./Entities";
import Entity from "./Entity";
import GarbageTruck from "./GarbageTruck";
import { Tree } from "./Tree";

export class EntityFactory {
  constructor(
    private spriteSheets: EntitySpriteSheets,
    private entities: Array<Entity>
  ) {}

  public getEntity(name: Entities) {
    switch (name) {
      case Entities.GARBAGE_TRUCK:
        return new GarbageTruck(this.spriteSheets[name], this.entities);
      case Entities.TREE:
        return new Tree(this.spriteSheets[name], this.entities);
    }
  }
}
