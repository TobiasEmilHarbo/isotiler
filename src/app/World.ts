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
import KeyboardControl, { KEYS, KEY_STATES } from "./Inputs/KeyboardControl";
import Vector from "./Vector";
import Tile from "./Tile";

export default class World {
  private compositor = new LayerCompositor();
  private _camera = new Camera();
  private garbageTruck: Entity;

  constructor(
    private tileGrid: TileGrid,
    private entities: Array<Entity>,
    private entityFactory: EntityFactory
  ) {
    this._camera.screenPosition = new Vector(
      Tile.WIDTH * 0.5,
      Tile.HEIGHT * 0.5
    );

    this.garbageTruck = this.entityFactory.getEntity(Entities.GARBAGE_TRUCK);

    this.garbageTruck.position = this.tileGrid.get(3, 4).center;

    this.entities.push(this.garbageTruck);

    this.camera.setEntityInFocus(this.garbageTruck);

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
        this.camera.position = this.camera.position.subtract(
          Vector.SOUTH.multiply(10)
        );
      },
    });
    keyboard.addKeyMapping(KEYS.ARROW_DOWN, {
      [KEY_STATES.PRESSED]: () => {
        this.camera.position = this.camera.position.subtract(
          Vector.NORTH.multiply(10)
        );
      },
    });
    keyboard.addKeyMapping(KEYS.ARROW_LEFT, {
      [KEY_STATES.PRESSED]: () => {
        this.camera.position = this.camera.position.subtract(
          Vector.EAST.multiply(10)
        );
      },
    });
    keyboard.addKeyMapping(KEYS.ARROW_RIGHT, {
      [KEY_STATES.PRESSED]: () => {
        this.camera.position = this.camera.position.subtract(
          Vector.WEST.multiply(10)
        );
      },
    });
  }

  public get camera(): Camera {
    return this._camera;
  }

  public draw(context: CanvasRenderingContext2D) {
    this.compositor.draw(context);
    this._camera.draw(context);
  }

  public update(deltaTime: number) {
    this.camera.update(deltaTime);
    this.compositor.update(deltaTime);
  }
}
