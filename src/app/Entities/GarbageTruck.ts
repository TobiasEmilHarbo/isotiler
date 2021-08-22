import Vector from "../Vector";
import Entity from "../Entity";
import { Direction } from "../library/Direction";
import SpriteSheet from "../SpriteSheet";

export default class GarbageTruck extends Entity {
  constructor(spriteSheet: SpriteSheet) {
    super(spriteSheet);
  }

  public update(): void {
    this.velocity = this.velocity.rotate(3);
    this.heading = this.velocity;

    // console.log("velocity: ", this.velocity.toString());
    // console.log("heading: ", this.heading.toString());

    this.currentSprite = this.spriteSheet.get(this.getHeading());

    this.getPosition().add(this.velocity);
  }

  public setVelocity(velocity: Vector): void {
    this.velocity = velocity;
  }

  private getHeading(): Direction {
    const north = new Vector(0, -1);
    const angle = this.heading.angleBetween(north);

    const OFFSET = 22.5;

    if (OFFSET + 45 * 0 < angle && angle <= OFFSET + 45 * 1) {
      return Direction.NORTH_EAST;
    }
    if (OFFSET + 45 * 1 < angle && angle <= OFFSET + 45 * 2) {
      return Direction.EAST;
    }
    if (OFFSET + 45 * 2 < angle && angle <= OFFSET + 45 * 3) {
      return Direction.SOUTH_EAST;
    }
    if (OFFSET + 45 * 3 < angle && angle <= OFFSET + 45 * 4) {
      return Direction.SOUTH;
    }
    if (OFFSET + 45 * 4 < angle && angle <= OFFSET + 45 * 5) {
      return Direction.SOUTH_WEST;
    }
    if (OFFSET + 45 * 5 < angle && angle <= OFFSET + 45 * 6) {
      return Direction.WEST;
    }
    if (OFFSET + 45 * 6 < angle && angle <= OFFSET + 45 * 7) {
      return Direction.NORTH_WEST;
    }

    return Direction.NORTH;
  }
}
