import Entity from "../Entities/Entity";
import Move from "./Move";

export default class MoveBackward extends Move {
  public update(entity: Entity, deltaTime: number): void {
    if (!this.activated) {
      return;
    }

    const currentSpeed = entity.velocity.magnitude();

    const angleOfHeading = entity.velocity.angleBetween(entity.heading);
    const slowDown =
      (270 < angleOfHeading && angleOfHeading < 360) ||
      (0 <= angleOfHeading && angleOfHeading < 90);

    if (slowDown && currentSpeed != 0) {
      return this.slowDown(entity, deltaTime);
    }

    const acceleration = this.acceleration * deltaTime;

    const newSpeed = currentSpeed + acceleration;

    if (newSpeed >= this.maxVelocity) {
      entity.velocity = entity.heading.setLength(this.maxVelocity).negate();
      return;
    }

    const newVelocity = entity.heading.setLength(newSpeed);

    entity.velocity = newVelocity.negate();
  }
}
