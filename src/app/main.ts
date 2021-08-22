import { forkJoin } from "rxjs";
import Vector from "./Vector";
import Canvas from "./Canvas";
import GarbageTruck from "./Entities/GarbageTruck";
import { loadImage } from "./library/loaders";
import tileMap from "./resources/tileMap";
import SpriteSheet from "./SpriteSheet";
import TileRenderer from "./TileRender";

const canvas = new Canvas(600, 1152);
canvas.appendTo(document.body);

forkJoin({
  groundSprites: loadImage("./resources/ground.png"),
  garbageTruckSprites: loadImage("./resources/garbage-truck.png"),
}).subscribe(({ groundSprites, garbageTruckSprites }) => {
  const groundSpriteSheet = new SpriteSheet(groundSprites, 128, 64);
  groundSpriteSheet.define("grass-0", 0, 0);
  groundSpriteSheet.define("grass-1", 128, 0);

  const garbageTruckSpriteSheet = new SpriteSheet(garbageTruckSprites);

  const garbageTruck = new GarbageTruck(garbageTruckSpriteSheet);
  garbageTruck.setPosition(new Vector(550, 250));

  const tileRenderer = new TileRenderer(9, 9, groundSpriteSheet, tileMap);

  function update(time: number) {
    canvas.clear();
    garbageTruck.update();
    tileRenderer.draw(canvas.context);
    garbageTruck.draw(canvas.context);
    requestAnimationFrame(update);
  }

  document.body.addEventListener("keypress", () => update(0));

  update(0);
});
