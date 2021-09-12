import Camera from "../Camera";
import Entity from "../Entities/Entity";
import Tile from "../Tile";
import TileGrid from "../TileGrid";
import LayerRenderer from "./LayerRenderer";

export class EntityRenderer implements LayerRenderer {
  private entitiesInView = Array<Entity>();

  constructor(private camera: Camera, private entities: Array<Entity>) {}

  public update(deltaTime: number) {
    this.entitiesInView.length = 0;

    for (let index = this.entities.length - 1; index >= 0; index--) {
      const entity = this.entities[index];
      entity.update(deltaTime);

      if (this.camera.isInView(entity.hitBox)) {
        this.entitiesInView.push(entity);
      }
    }

    this.entitiesInView.sort((a: Entity, b: Entity) => {
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
    context.save();
    context.clip(this.camera.viewPort);

    for (let index = this.entitiesInView.length - 1; index >= 0; index--) {
      const entity = this.entitiesInView[index];
      entity.draw(context, this.camera.position.x, this.camera.position.y);
    }

    context.restore();
  }
}
