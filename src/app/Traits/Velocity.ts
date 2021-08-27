import Entity from "../Entities/Entity";
import Trait from "./Trait";

export default class Velocity extends Trait {
  public update(entity: Entity): void {
    entity.position.add(entity.velocity);
  }
}
