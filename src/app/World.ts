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
import { RoadGraph } from "./data-structures/graph/RoadGraph";
import TileGrid from "./tiles/TileGrid";
import Entity from "./Entities/Entity";
import Tile from "./tiles/Tile";
import Camera from "./Camera";
import Vector from "./Vector";
import { VehicleController } from "./VehicleController";
import MouseControl, {
  BUTTON,
  modifiers,
  MOUSE_EVENTS,
  noModifiers,
} from "./Inputs/MouseControl";
import { StaticRenderer } from "./Renderers/StaticRenderer";

export default class World {
  private compositor = new LayerCompositor();
  private _camera = new Camera();
  private points = Array<Vector>();
  private entityController: VehicleController;

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

    garbageTruck.position = this.tileGrid.get(8, 10).center;
    redSedan.position = this.tileGrid.get(9, 10).center;

    this.entities.push(redSedan);
    this.entities.push(garbageTruck);

    this.camera.setEntityInFocus(garbageTruck);
    this.camera.setFocus(garbageTruck.position);

    this.entityController = new VehicleController();
    this.entityController.setEntity(garbageTruck);

    this.compositor.addLayer(new TileRenderer(this.camera, this.tileGrid));
    this.compositor.addLayer(new EntityRenderer(this.camera, this.entities));

    this.compositor.addLayer(new TileLineRenderer(this.camera, this.tileGrid));
    this.compositor.addLayer(
      new RoadGraphRenderer(this.camera, new RoadGraph(this.tileGrid))
    );
    this.compositor.addLayer(
      new EntityLineRenderer(this.camera, this.entities)
    );
    this.compositor.addLayer(new CameraLineRenderer(this.camera));

    this.compositor.addLayer(new StaticRenderer(this.camera));

    // const mouse = new MouseControl(true);
    // mouse.addEventMapping(MOUSE_EVENTS.CLICK, {
    //   [BUTTON.LEFT]: noModifiers((coordinates) => {
    //     const gameCoordinates = this._camera.toGameCoordinates(coordinates);
    //     this.entityController.goTo(gameCoordinates);
    //     this.points.push(gameCoordinates);
    //   }),
    // });
  }

  private get camera(): Camera {
    return this._camera;
  }

  public draw(context: CanvasRenderingContext2D) {
    this.compositor.draw(context);
    context.strokeStyle = "red";
    const { x, y } = this._camera.position.negate();
    this.points.forEach((point) => {
      point.draw(context, x, y);
    });
  }

  public update(deltaTime: number) {
    this.compositor.update(deltaTime);
    this.camera.update(deltaTime);
    // this.entityController.update(deltaTime);
  }
}
