import Entity from "../Entities/Entity";
import LayerRenderer from "./LayerRenderer";

export class ConstructionLineRenderer implements LayerRenderer {
  constructor(private entities: Array<Entity>) {}

  public update(deltaTime: number) {}

  public draw(context: CanvasRenderingContext2D): void {
    for (let index = this.entities.length - 1; index >= 0; index--) {
      const entity = this.entities[index];

      entity.hitBox.draw(context);

      context.strokeStyle = "red";
      context.beginPath();

      const heading = entity.heading.setLength(18);
      heading.add(entity.position);

      context.moveTo(entity.position.x, entity.position.y);
      context.lineTo(heading.x, heading.y);
      context.closePath();

      context.stroke();
    }
  }
}
