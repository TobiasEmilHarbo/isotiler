import { forkJoin } from "rxjs";
import Vector from "./Vector";
import Canvas from "./Canvas";
import GarbageTruck from "./Entities/GarbageTruck";
import { loadImage } from "./library/loaders";
import tileMap from "./resources/tileMap";
import SpriteSheet from "./SpriteSheet";
import TileRenderer from "./TileRender";
import Timer from "./Timer";
import { Tree } from "./Entities/Tree";
import { EntityRenderer } from "./EntityRenderer";

const canvas = new Canvas(600, 1152);
canvas.appendTo(document.body);

forkJoin({
  groundSprites: loadImage("./resources/ground.png"),
  garbageTruckSprites: loadImage("./resources/garbage-truck.png"),
  treeSprites: loadImage("./resources/tree.png"),
}).subscribe(({ groundSprites, garbageTruckSprites, treeSprites }) => {
  const groundSpriteSheet = new SpriteSheet(groundSprites, 128, 64);
  groundSpriteSheet.define("grass-0", 0, 0);
  groundSpriteSheet.define("grass-1", 128, 0);

  const treeSpriteSheet = new SpriteSheet(treeSprites);
  const tree = new Tree(treeSpriteSheet);
  tree.position = new Vector(610, 240);

  const tree2 = new Tree(treeSpriteSheet);
  tree2.position = new Vector(560, 280);

  const garbageTruckSpriteSheet = new SpriteSheet(garbageTruckSprites);

  const garbageTruck = new GarbageTruck(garbageTruckSpriteSheet);
  garbageTruck.position = new Vector(615, 268);

  const tileRenderer = new TileRenderer(9, 9, groundSpriteSheet, tileMap);

  const timer = new Timer();

  const entityRenderer = new EntityRenderer();

  entityRenderer.add(tree);
  entityRenderer.add(tree2);
  entityRenderer.add(garbageTruck);

  timer.onUpdate((deltaTime) => {
    canvas.clear();

    entityRenderer.update();

    tileRenderer.draw(canvas.context);
    entityRenderer.draw(canvas.context);

    garbageTruck.update(deltaTime);
  });

  timer.start();
});
