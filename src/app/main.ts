import { forkJoin } from "rxjs";
import Vector from "./Vector";
import Canvas from "./Canvas";
import GarbageTruck from "./Entities/GarbageTruck";
import { spriteSheetLoader, worldLoader } from "./library/loaders";
import Timer from "./Timer";
import { EntityRenderer } from "./Renderers/EntityRenderer";
import LayerCompositor from "./Renderers/LayerCompositor";
import Entity from "./Entities/Entity";
import { ConstructionLineRenderer } from "./Renderers/ContructionLineRenderer";
import TileRenderer from "./Renderers/TileRender";
import { Tree } from "./Entities/Tree";

const canvas = new Canvas(896, 448);
canvas.appendTo(document.body);

forkJoin({
  grid: worldLoader("one"),
  garbageTruckSprites: spriteSheetLoader("./resources/garbage-truck.png"),
  treeSprites: spriteSheetLoader("./resources/tree.png"),
}).subscribe(({ grid, garbageTruckSprites, treeSprites }) => {
  const entities = new Array<Entity>();

  // const tree = new Tree(treeSprites);
  // tree.position = new Vector(610, 240);

  const tree2 = new Tree(treeSprites);
  tree2.position = new Vector(560, 280);

  const garbageTruck = new GarbageTruck(garbageTruckSprites);
  garbageTruck.position = new Vector(448, 224);

  const tileRenderer = new TileRenderer(grid);
  entities.push(tree2);
  // entityRenderer.add(tree2);
  entities.push(garbageTruck);

  const entityRenderer = new EntityRenderer(entities);
  const lineRenderer = new ConstructionLineRenderer(entities);

  const compositor = new LayerCompositor();
  compositor.addLayer(tileRenderer);
  compositor.addLayer(entityRenderer);
  compositor.addLayer(lineRenderer);

  const timer = new Timer();

  timer.onUpdate((deltaTime) => {
    canvas.clear();
    compositor.update(deltaTime);
    compositor.draw(canvas.context);
  });

  timer.start();

  document.querySelector("canvas").addEventListener("mouseup", (event) => {
    const tileWidth = 128;
    const tileHeight = 64;

    const determinate = (tileWidth * tileHeight) / 2;

    const rows = 7;

    const offset = (rows * Math.pow(tileHeight, 2)) / 2;

    const x =
      ((event.offsetX * tileHeight) / 2 +
        (event.offsetY * tileWidth) / 2 -
        offset) /
      determinate;

    const y =
      ((event.offsetX * -tileHeight) / 2 +
        (event.offsetY * tileWidth) / 2 +
        offset) /
      determinate;

    console.log("TILE:", Math.floor(x), Math.floor(y));
  });
});
