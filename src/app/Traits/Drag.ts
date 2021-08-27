import Entity from "../Entities/Entity";
import Vector from "../Vector";
import Trait from "./Trait";

export default class Drag extends Trait {
  constructor(private maxDragCoefficient: number) {
    super();
  }
  public update(entity: Entity, deltaTime: number): void {
    if (!(entity.velocity.magnitude() > 0)) return;

    const dragCoefficient = (this.maxDragCoefficient / 100) * deltaTime;

    const currentSpeed = entity.velocity.magnitude();

    const newSpeed = currentSpeed - dragCoefficient;

    if (newSpeed <= 0) {
      entity.velocity = new Vector();
      return;
    }

    const angleOfHeading = entity.velocity.angleBetween(entity.heading);
    const reversing = angleOfHeading <= 270 && 90 <= angleOfHeading;

    const newVelocity = entity.heading.setLength(newSpeed);

    if (reversing) {
      entity.velocity = newVelocity.negate();
    } else {
      entity.velocity = newVelocity;
    }
  }
}
