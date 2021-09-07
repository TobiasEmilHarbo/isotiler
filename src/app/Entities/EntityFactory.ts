import { EntitySpriteSheets } from "../sprites/EntitySpriteSheets";
import { Entities } from "./Entities";
import GarbageTruck from "./GarbageTruck";
import { Tree } from "./Tree";

export class EntityFactory {
  constructor(private spriteSheets: EntitySpriteSheets) {}

  public getEntity(name: Entities) {
    switch (name) {
      case Entities.GARBAGE_TRUCK:
        return new GarbageTruck(this.spriteSheets[name]);
      case Entities.TREE:
        return new Tree(this.spriteSheets[name]);
    }
  }
}
