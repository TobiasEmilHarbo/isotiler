import KeyboardControl, { KEYS, KEY_STATES } from "./Inputs/KeyboardControl";
import { EntityLineRenderer } from "./Renderers/EntityLineRenderer";
import { CameraLineRenderer } from "./Renderers/CameraLineRenderer";
import { TileLineRenderer } from "./Renderers/TileLineRenderer";
import RoadGraphRenderer from "./Renderers/RoadGraphRenderer";
import { EntityRenderer } from "./Renderers/EntityRenderer";
import LayerCompositor from "./Renderers/LayerCompositor";
import { EntityFactory } from "./Entities/EntityFactory";
import TileRenderer from "./Renderers/TileRender";
import { Entities } from "./Entities/Entities";
import { RoadGraph } from "./graph/RoadGraph";
import TileGrid from "./tiles/TileGrid";
import Entity from "./Entities/Entity";
import Tile from "./tiles/Tile";
import Camera from "./Camera";
import Vector from "./Vector";

export default class World {
  private compositor = new LayerCompositor();
  private _camera = new Camera();

  constructor(
    private tileGrid: TileGrid,
    private entities: Array<Entity>,
    private entityFactory: EntityFactory
  ) {
    this._camera.screenPosition = new Vector(
      Tile.WIDTH * 0.5,
      Tile.HEIGHT * 0.5
    );

    const garbageTruck = this.entityFactory.getEntity(Entities.GARBAGE_TRUCK);
    const redSedan = this.entityFactory.getEntity(Entities.RED_SEDAN);

    redSedan.position = this.tileGrid.get(11, 10).center;
    garbageTruck.position = this.tileGrid.get(10, 10).center;

    this.entities.push(redSedan);
    this.entities.push(garbageTruck);

    this.camera.setEntityInFocus(garbageTruck);

    const tileRenderer = new TileRenderer(this._camera, this.tileGrid);
    const tileLineRenderer = new TileLineRenderer(this._camera, this.tileGrid);

    const entityRenderer = new EntityRenderer(this._camera, this.entities);
    const entityLineRenderer = new EntityLineRenderer(
      this._camera,
      this.entities
    );

    const roadGraph = new RoadGraph(this.tileGrid);

    const roadGraphRenderer = new RoadGraphRenderer(this._camera, roadGraph);

    const cameraLineRenderer = new CameraLineRenderer(this._camera);

    this.compositor.addLayer(tileRenderer);
    this.compositor.addLayer(entityRenderer);

    this.compositor.addLayer(tileLineRenderer);
    this.compositor.addLayer(roadGraphRenderer);
    this.compositor.addLayer(entityLineRenderer);
    this.compositor.addLayer(cameraLineRenderer);

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

    // const tileResolver = new TileResolver(this.tileGrid);

    // const mouse = new MouseControl(true);
    // mouse.addEventMapping(MOUSE_EVENTS.CLICK, {
    //   [BUTTON.LEFT]: (coordinates) => {
    //     const { x, y } = coordinates.add(this.camera.position);

    //     const tile = tileResolver.resolve(x, y);
    //     console.log(tileResolver.getAdjacentTiles(tile));
    //   },
    // });
  }

  public get camera(): Camera {
    return this._camera;
  }

  public draw(context: CanvasRenderingContext2D) {
    this.compositor.draw(context);
  }

  public update(deltaTime: number) {
    this.compositor.update(deltaTime);
    this.camera.update(deltaTime);
  }
}
