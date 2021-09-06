import Entity from "../Entities/Entity";
import LayerRenderer from "./LayerRenderer";

export class EntityRenderer implements LayerRenderer {
  private entities: Array<Entity>;
  constructor(entities: Array<Entity>) {
    this.entities = [...entities];
  }

  public update(deltaTime: number) {
    this.entities.sort((a: Entity, b: Entity) => {
      if (a.position.y < b.position.y) {
        return 1;
      }

      if (a.position.y > b.position.y) {
        return -1;
      }

      return 0;
    });

    for (let index = this.entities.length - 1; index >= 0; index--) {
      const entity = this.entities[index];
      entity.update(deltaTime);
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    for (let index = this.entities.length - 1; index >= 0; index--) {
      const entity = this.entities[index];
      entity.draw(context);
    }
  }
}
