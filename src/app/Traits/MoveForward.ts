import Entity from "../Entities/Entity";
import Move from "./Move";

export default class MoveForward extends Move {
  public update(entity: Entity, deltaTime: number): void {
    if (!this.activated) {
      return;
    }

    const angleOfHeading = entity.velocity.angleBetween(entity.heading);
    const slowDown = angleOfHeading <= 270 && 90 <= angleOfHeading;

    if (slowDown) {
      return this.slowDown(entity, deltaTime);
    }

    const acceleration = this.acceleration * deltaTime;

    const currentSpeed = entity.velocity.magnitude();

    const newSpeed = currentSpeed + acceleration;

    if (newSpeed >= this.maxVelocity) {
      entity.velocity = entity.heading.setLength(this.maxVelocity);
      return;
    }

    const newVelocity = entity.heading.setLength(newSpeed);

    entity.velocity = newVelocity;
  }
}
