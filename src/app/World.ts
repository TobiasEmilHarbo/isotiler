import { Entities } from "./Entities/Entities";
import Entity from "./Entities/Entity";
import { EntityFactory } from "./Entities/EntityFactory";
import { ConstructionLineRenderer } from "./Renderers/ConstructionLineRenderer";
import { EntityRenderer } from "./Renderers/EntityRenderer";
import LayerCompositor from "./Renderers/LayerCompositor";
import TileRenderer from "./Renderers/TileRender";
import TileGrid from "./TileGrid";

export default class World {
  private compositor = new LayerCompositor();

  constructor(
    private tileGrid: TileGrid,
    private entities: Array<Entity>,
    private entityFactory: EntityFactory
  ) {
    const garbageTruck = this.entityFactory.getEntity(Entities.GARBAGE_TRUCK);

    garbageTruck.position = this.tileGrid.get(2, 5).center;

    this.entities.push(garbageTruck);

    const tileRenderer = new TileRenderer(this.tileGrid);
    const entityRenderer = new EntityRenderer(this.entities);
    const lineRenderer = new ConstructionLineRenderer(this.entities);

    this.compositor.addLayer(tileRenderer);
    this.compositor.addLayer(entityRenderer);
    this.compositor.addLayer(lineRenderer);
  }

  public draw(context: CanvasRenderingContext2D) {
    this.compositor.draw(context);
  }

  public update(deltaTime: number) {
    this.compositor.update(deltaTime);
  }
}
