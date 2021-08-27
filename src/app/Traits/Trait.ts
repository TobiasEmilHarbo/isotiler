import Entity from "../Entities/Entity";

export default abstract class Trait {
  public abstract update(entity: Entity, deltaTime: number): void;
}
