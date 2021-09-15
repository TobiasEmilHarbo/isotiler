import Entity from "../Entities/Entity";
import Circle from "../geometry/Circle";
import Vector from "../Vector";
import Trait from "./Trait";

export default class RigidBody extends Trait {
  constructor(private entities: Array<Entity>) {
    super();
  }

  public update(entity: Entity, deltaTime: number): void {
    this.entities.forEach((otherEntity: Entity) => {
      if (entity === otherEntity) return;
      if (entity.hitBox instanceof Circle) {
        if (entity.hitBox.intersects(otherEntity.hitBox)) {
          if (otherEntity.hitBox instanceof Circle) {
            const distanceVector = otherEntity.position.subtract(
              entity.position
            );

            const newDistanceVector = distanceVector
              .setLength(otherEntity.hitBox.radius + entity.hitBox.radius)
              .negate();

            entity.position = otherEntity.position.add(newDistanceVector);

            const currentSpeed = entity.velocity.magnitude;

            const newSpeed = currentSpeed - 2 * deltaTime;

            if (newSpeed <= 0) {
              entity.velocity = new Vector();
              return;
            }

            entity.velocity = entity.velocity.setLength(newSpeed);
          }
        }
      }
    });
  }
}
