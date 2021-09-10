import { Entities } from "./Entities/Entities";
import Entity from "./Entities/Entity";
import { EntityFactory } from "./Entities/EntityFactory";
import { ConstructionLineRenderer } from "./Renderers/ConstructionLineRenderer";
import { TileConstructionLineRenderer } from "./Renderers/TileConstructionLineRenderer";
import { EntityRenderer } from "./Renderers/EntityRenderer";
import LayerCompositor from "./Renderers/LayerCompositor";
import TileRenderer from "./Renderers/TileRender";
import TileGrid from "./TileGrid";
import Camera from "./Camera";
import KeyboardControl, { KEYS, KEY_STATES } from "./KeyboardControl";
import Vector from "./Vector";

export default class World {
  private compositor = new LayerCompositor();
  private camera = new Camera();

  constructor(
    private tileGrid: TileGrid,
    private entities: Array<Entity>,
    private entityFactory: EntityFactory
  ) {
    const garbageTruck = this.entityFactory.getEntity(Entities.GARBAGE_TRUCK);

    garbageTruck.position = this.tileGrid.get(2, 5).center;

    this.entities.push(garbageTruck);

    const tileRenderer = new TileRenderer(this.camera, this.tileGrid);
    const tileLineRenderer = new TileConstructionLineRenderer(
      this.camera,
      this.tileGrid
    );

    const entityRenderer = new EntityRenderer(this.camera, this.entities);
    const lineRenderer = new ConstructionLineRenderer(
      this.camera,
      this.entities
    );

    this.compositor.addLayer(tileRenderer);
    this.compositor.addLayer(tileLineRenderer);
    this.compositor.addLayer(entityRenderer);
    this.compositor.addLayer(lineRenderer);

    const keyboard = new KeyboardControl(true);

    keyboard.addKeyMapping(KEYS.ARROW_UP, {
      [KEY_STATES.PRESSED]: () => {
        this.camera.position = this.camera.position.add(
          Vector.NORTH.multiply(10)
        );
      },
    });
    keyboard.addKeyMapping(KEYS.ARROW_DOWN, {
      [KEY_STATES.PRESSED]: () => {
        this.camera.position = this.camera.position.add(
          Vector.SOUTH.multiply(10)
        );
      },
    });
    keyboard.addKeyMapping(KEYS.ARROW_LEFT, {
      [KEY_STATES.PRESSED]: () => {
        this.camera.position = this.camera.position.add(
          Vector.WEST.multiply(10)
        );
      },
    });
    keyboard.addKeyMapping(KEYS.ARROW_RIGHT, {
      [KEY_STATES.PRESSED]: () => {
        this.camera.position = this.camera.position.add(
          Vector.EAST.multiply(10)
        );
      },
    });
  }

  public draw(context: CanvasRenderingContext2D) {
    this.compositor.draw(context);
  }

  public update(deltaTime: number) {
    this.compositor.update(deltaTime);
  }
}
