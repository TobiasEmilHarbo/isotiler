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
import Tile from "./Tile";

export default class World {
  private compositor = new LayerCompositor();
  private _camera = new Camera();

  constructor(
    private tileGrid: TileGrid,
    private entities: Array<Entity>,
    private entityFactory: EntityFactory
  ) {
    this._camera.screenPosition = new Vector(Tile.WIDTH, Tile.HEIGHT);

    const garbageTruck = this.entityFactory.getEntity(Entities.GARBAGE_TRUCK);

    garbageTruck.position = this.tileGrid.get(3, 4).center;

    this.entities.push(garbageTruck);

    const tileRenderer = new TileRenderer(this._camera, this.tileGrid);
    const tileLineRenderer = new TileConstructionLineRenderer(
      this._camera,
      this.tileGrid
    );

    const entityRenderer = new EntityRenderer(this._camera, this.entities);
    const lineRenderer = new ConstructionLineRenderer(
      this._camera,
      this.entities
    );

    this.compositor.addLayer(tileRenderer);
    this.compositor.addLayer(tileLineRenderer);
    this.compositor.addLayer(entityRenderer);
    this.compositor.addLayer(lineRenderer);

    const keyboard = new KeyboardControl(true);

    keyboard.addKeyMapping(KEYS.ARROW_UP, {
      [KEY_STATES.PRESSED]: () => {
        this._camera.position = this._camera.position.subtract(
          Vector.NORTH.multiply(10)
        );
      },
    });
    keyboard.addKeyMapping(KEYS.ARROW_DOWN, {
      [KEY_STATES.PRESSED]: () => {
        this._camera.position = this._camera.position.subtract(
          Vector.SOUTH.multiply(10)
        );
      },
    });
    keyboard.addKeyMapping(KEYS.ARROW_LEFT, {
      [KEY_STATES.PRESSED]: () => {
        this._camera.position = this._camera.position.subtract(
          Vector.WEST.multiply(10)
        );
      },
    });
    keyboard.addKeyMapping(KEYS.ARROW_RIGHT, {
      [KEY_STATES.PRESSED]: () => {
        this._camera.position = this._camera.position.subtract(
          Vector.EAST.multiply(10)
        );
      },
    });
  }

  public draw(context: CanvasRenderingContext2D) {
    this.compositor.draw(context);
    this._camera.draw(context);
  }

  public update(deltaTime: number) {
    this.compositor.update(deltaTime);
  }
}
