import Entity from "./Entities/Entity";
import { Drawable } from "./library/Drawable";

export class EntityRenderer implements Drawable {
  private entities = Array<Entity>();

  public add(entity: Entity): void {
    this.entities.push(entity);
  }

  public update() {
    this.entities.sort((a: Entity, b: Entity) => {
      if (a.position.y < b.position.y) {
        return 1;
      }

      if (a.position.y > b.position.y) {
        return -1;
      }

      return 0;
    });
  }

  public draw(context: CanvasRenderingContext2D): void {
    for (let index = this.entities.length - 1; index >= 0; index--) {
      const entity = this.entities[index];
      entity.draw(context);
    }
  }
}
