import Vector from "../../Vector";
import Entity from "../Entity";
import { Direction } from "../library/Direction";

export default class GarbageTruck extends Entity {
  public update() {
    this.velocity = this.velocity.rotate(2);

    this.currentSprite = this.spriteSheet.get(this.getDirection());

    this.getPosition().add(this.velocity);
  }

  public setVelocity(velocity: Vector) {
    this.velocity = velocity;
  }

  private getDirection() {
    const north = new Vector(0, 1);
    const angle = this.velocity.angleBetween360(north);

    if (22.5 + 45 * 0 < angle && angle <= 22.5 + 45 * 1) {
      return Direction.NORTH_EAST;
    }
    if (22.5 + 45 * 1 < angle && angle <= 22.5 + 45 * 2) {
      return Direction.EAST;
    }
    if (22.5 + 45 * 2 < angle && angle <= 22.5 + 45 * 3) {
      return Direction.SOUTH_EAST;
    }
    if (22.5 + 45 * 3 < angle && angle <= 22.5 + 45 * 4) {
      return Direction.SOUTH;
    }
    if (22.5 + 45 * 4 < angle && angle <= 22.5 + 45 * 5) {
      return Direction.SOUTH_WEST;
    }
    if (22.5 + 45 * 5 < angle && angle <= 22.5 + 45 * 6) {
      return Direction.WEST;
    }
    if (22.5 + 45 * 6 < angle && angle <= 22.5 + 45 * 7) {
      return Direction.NORTH_WEST;
    }

    return Direction.NORTH;
  }
}
