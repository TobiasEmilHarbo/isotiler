import {
  combineLatest,
  forkJoin,
  map,
  Observable,
  Subscriber,
  switchMap,
} from "rxjs";
import { Entities } from "../Entities/Entities";
import Entity from "../Entities/Entity";
import { EntityFactory } from "../Entities/EntityFactory";
import { symbolEntityMapper, symbolSpriteMapper } from "../Mappers";
import { EntityImport } from "../sprites/EntityImport";
import { EntitySpriteSheetObservables } from "../sprites/EntitySpriteSheetObservables";
import { EntitySpriteSheets } from "../sprites/EntitySpriteSheets";
import SpriteSheet from "../sprites/SpriteSheet";
import Tile from "../Tile";
import TileGrid from "../TileGrid";
import World from "../World";
import { WorldDetail } from "../world/WorldDetail";
import { WorldDetails } from "../world/WorldDetails";

const loadJsonFile = <T>(url: string): Observable<T> => {
  return new Observable((subscriber: Subscriber<T>) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        subscriber.next(json);
        subscriber.complete();
      });
  });
};

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

export const entitySpriteSheetFactoryLoader =
  (): Observable<EntitySpriteSheets> => {
    return new Observable((subscriber: Subscriber<EntitySpriteSheets>) => {
      loadJsonFile<EntityImport>("../world/entities.json").subscribe(
        (entities: EntityImport) => {
          const observables = {} as EntitySpriteSheetObservables;

          Object.keys(entities).forEach((name: Entities) => {
            observables[name] = spriteSheetLoader(
              `./resources/${entities[name].sprite}`
            );
          });

          forkJoin(observables).subscribe(
            (spriteSheets: EntitySpriteSheets) => {
              subscriber.next(spriteSheets);
              subscriber.complete();
            }
          );
        }
      );
    });
  };

export const tileGridLoader = (world: WorldDetail): Observable<TileGrid> => {
  return spriteSheetLoader(`./resources/${world.spriteName}.png`).pipe(
    map((sprites: SpriteSheet) => {
      sprites.setDefaultSpriteSize(128, 64);

      sprites.define("grass-0", 0, 0);
      sprites.define("grass-1", 128, 0);

      const grid = new TileGrid();
      for (let x = 0; x < world.columns; x++) {
        const row = world.tiles[x];
        if (!row) continue;

        for (let y = 0; y < world.rows; y++) {
          const symbol = row.charAt(y);
          if (!symbol) continue;

          const spriteName = symbolSpriteMapper.get(symbol);
          const sprite = sprites.get(`${spriteName}-0`);

          const sX =
            (Tile.WIDTH * world.columns) / 2 +
            (y - x) * (Tile.WIDTH / 2) -
            Tile.WIDTH / 2;

          const sY = (y + x) * (Tile.HEIGHT / 2);

          const tile = new Tile(x, y, sX, sY, sprite);
          grid.add(tile);
        }
      }
      return grid;
    })
  );
};

export const worldLoader = (name: string): Observable<World> => {
  return combineLatest([
    loadJsonFile<WorldDetails>("../world/world.json"),
    entitySpriteSheetFactoryLoader(),
  ]).pipe(
    switchMap(([worlds, entitySpriteSheets]) => {
      const entities = new Array<Entity>();
      const entityFactory = new EntityFactory(entitySpriteSheets, entities);
      const world = worlds[name];

      return tileGridLoader(world).pipe(
        map((grid: TileGrid) => {
          for (let x = 0; x < world.columns; x++) {
            const row = world.entities[x];
            if (!row) continue;

            for (let y = 0; y < world.rows; y++) {
              const symbol = row.charAt(y);
              if (!symbol) continue;

              const entityName = symbolEntityMapper.get(symbol);
              if (!entityName) continue;

              const entity = entityFactory.getEntity(entityName);

              const tile = grid.get(x, y);
              entity.position = tile.center;
              entities.push(entity);
            }
          }

          return new World(grid, entities, entityFactory);
        })
      );
    })
  );
};
