import Entity from "../Entities/Entity";
import { Direction } from "../library/Direction";
import Vector from "../Vector";
import Trait from "./Trait";

export default class Head extends Trait {
  public update(entity: Entity): void {
    entity.setSprite(this.getDirection(entity));
  }

  private getDirection(entity: Entity): Direction {
    const north = Vector.NORTH;
    const angle = entity.heading.angleBetween(north);

    const offset = 22.5;
    const sectionCount = 8;
    const section = 360 / sectionCount;

    // const direction = [
    //   Direction.NORTH_EAST,
    //   Direction.EAST,
    //   Direction.SOUTH_EAST,
    //   Direction.SOUTH,
    //   Direction.SOUTH_WEST,
    //   Direction.WEST,
    //   Direction.NORTH_WEST,
    // ].find((_: Direction, index: number) => {
    //   return (
    //     offset + section * index < angle &&
    //     angle <= offset + section * index + 1
    //   );
    // });

    if (offset + section * 0 < angle && angle <= offset + section * 1) {
      return Direction.NORTH_EAST;
    }
    if (offset + section * 1 < angle && angle <= offset + section * 2) {
      return Direction.EAST;
    }
    if (offset + section * 2 < angle && angle <= offset + section * 3) {
      return Direction.SOUTH_EAST;
    }
    if (offset + section * 3 < angle && angle <= offset + section * 4) {
      return Direction.SOUTH;
    }
    if (offset + section * 4 < angle && angle <= offset + section * 5) {
      return Direction.SOUTH_WEST;
    }
    if (offset + section * 5 < angle && angle <= offset + section * 6) {
      return Direction.WEST;
    }
    if (offset + section * 6 < angle && angle <= offset + section * 7) {
      return Direction.NORTH_WEST;
    }

    return Direction.NORTH;
  }
}
