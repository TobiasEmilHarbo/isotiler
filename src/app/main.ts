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
  garbageTruckSpriteSheet.define("N", 90, 8, 19, 27, new Vector(10, 16));
  garbageTruckSpriteSheet.define("NW", 42, 5, 35, 30, new Vector(17, 19));
  garbageTruckSpriteSheet.define("W", 4, 6, 32, 29, new Vector(15, 18));
  garbageTruckSpriteSheet.define("SW", 123, 45, 34, 32, new Vector(17, 18));
  garbageTruckSpriteSheet.define("S", 90, 46, 19, 30, new Vector(10, 17));
  garbageTruckSpriteSheet.define("SE", 42, 43, 35, 33, new Vector(18, 20));
  garbageTruckSpriteSheet.define("E", 3, 47, 33, 28, new Vector(17, 17));
  garbageTruckSpriteSheet.define("NE", 122, 6, 35, 30, new Vector(18, 18));

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
