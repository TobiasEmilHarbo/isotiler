import { first, map, Observable, Subscriber } from "rxjs";
import symbolSpriteMap from "../Mappers";
import SpriteSheet from "../SpriteSheet";
import Tile from "../Tile";
import TileGrid from "../TileGrid";
import World from "../World/World";

export const loadImage = (url: string): Observable<HTMLImageElement> => {
  return new Observable((subscriber: Subscriber<HTMLImageElement>) => {
    const sprite = new Image();
    sprite.src = url;
    sprite.onload = () => {
      subscriber.next(sprite);
      subscriber.complete();
    };
  });
};

export const spriteSheetLoader = (url: string): Observable<SpriteSheet> => {
  return loadImage(url).pipe(map((image) => new SpriteSheet(image)));
};

export const worldLoader = (name: string): Observable<TileGrid> => {
  return new Observable((subscriber: Subscriber<TileGrid>) => {
    fetch("../world/world.json")
      .then((response) => response.json())
      .then((worlds: World) => {
        const world = worlds[name];
        spriteSheetLoader(`./resources/${world.spriteName}.png`)
          .pipe(first())
          .subscribe((sprites: SpriteSheet) => {
            sprites.setDefaultSpriteSize(128, 64);

            sprites.define("grass-0", 0, 0);
            sprites.define("grass-1", 128, 0);

            const grid = new TileGrid();

            for (let x = 0; x < world.columns; x++) {
              const row = world.tiles[x];

              for (let y = 0; y < world.rows; y++) {
                const spriteName = symbolSpriteMap.get(row.charAt(y));
                const sprite = sprites.get(`${spriteName}-0`);

                const sX =
                  (Tile.WIDTH * world.columns) / 2 +
                  (y - x) * (Tile.WIDTH / 2) -
                  Tile.WIDTH;

                const sY = (y + x) * (Tile.HEIGHT / 2);

                const tile = new Tile(x, y, sX, sY, sprite);
                grid.add(tile);
              }
            }

            subscriber.next(grid);
            subscriber.complete();
          });
      });
  });
};
