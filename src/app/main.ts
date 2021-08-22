import { forkJoin } from "rxjs";
import Vector from "../Vector";
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
  garbageTruckSpriteSheet.define("N", 90, 8, 19, 27);
  garbageTruckSpriteSheet.define("NW", 42, 5, 35, 30);
  garbageTruckSpriteSheet.define("W", 4, 6, 32, 29);
  garbageTruckSpriteSheet.define("SW", 123, 45, 34, 32);
  garbageTruckSpriteSheet.define("S", 90, 46, 19, 30);
  garbageTruckSpriteSheet.define("SE", 42, 43, 35, 33);
  garbageTruckSpriteSheet.define("E", 3, 47, 33, 28);
  garbageTruckSpriteSheet.define("NE", 122, 6, 35, 30);

  const garbageTruck = new GarbageTruck(garbageTruckSpriteSheet);
  garbageTruck.setPosition(new Vector(550, 250));
  garbageTruck.setVelocity(new Vector(2, 1));

  const tileRenderer = new TileRenderer(9, 9, groundSpriteSheet, tileMap);

  function update(time: number) {
    canvas.clear();
    garbageTruck.update();
    tileRenderer.draw(canvas.context);
    garbageTruck.draw(canvas.context);
    requestAnimationFrame(update);
  }

  update(0);
});
