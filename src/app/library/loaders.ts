import {
  combineLatest,
  first,
  forkJoin,
  map,
  Observable,
  of,
  pipe,
  Subscriber,
  switchMap,
  tap,
  withLatestFrom,
} from "rxjs";
import { Entities } from "../Entities/Entities";
import Entity from "../Entities/Entity";
import { EntityFactory } from "../Entities/EntityFactory";
import { symbolEntityMapper, symbolSpriteMapper } from "../Mappers";
import { RoadProcessor } from "../mapPreprocessor/RoadProcessor";
import { EntityImport } from "../sprites/EntityImport";
import { EntitySpriteSheetObservables } from "../sprites/EntitySpriteSheetObservables";
import { EntitySpriteSheets } from "../sprites/EntitySpriteSheets";
import SpriteSheet from "../sprites/SpriteSheet";
import Tile from "../tiles/Tile";
import TileFactory from "../tiles/TileFactory";
import TileGrid from "../tiles/TileGrid";
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
  return spriteSheetLoader(`./resources/${world.spriteSheet.name}.png`).pipe(
    map((sprites: SpriteSheet) => {
      sprites.setDefaultSpriteSize(128, 64);

      world.spriteSheet.types.forEach((type) => {
        type.sprites.forEach(({ x, y }) => {
          sprites.defineInGroup(type.name, x, y);
        });
      });

      sprites.define("road", 896, 128);

      const tileFactory = new TileFactory();
      const grid = new TileGrid();

      const longestRow = parseInt(
        world.tiles.reduce((rowA: string, rowB: string): string =>
          Math.max(rowA.length, rowB.length).toString()
        )
      );

      const mapScreenWidth = Tile.WIDTH * longestRow;

      for (let y = 0; y < world.tiles.length; y++) {
        const row = world.tiles[y];
        if (!row) continue;
        for (let x = 0; x < row.length; x++) {
          const symbol = row.charAt(x);
          if (!symbol) continue;

          const spriteName = symbolSpriteMapper.get(symbol);
          const sprite = sprites.get(`${spriteName}`);

          const sX =
            mapScreenWidth / 2 + (x - y) * (Tile.WIDTH / 2) - Tile.WIDTH * 2.5;

          const sY = (x + y) * (Tile.HEIGHT / 2);

          const tile = tileFactory.getTile(spriteName, x, y, sX, sY, sprite);
          grid.add(tile);
        }
      }
      return grid;
    }),
    switchMap((grid) => {
      return combineLatest({
        grid: of(grid),
        spriteSheet: spriteSheetLoader(`./resources/road-tiles.png`),
      }).pipe(
        map(({ grid, spriteSheet }) => {
          const processor = new RoadProcessor(spriteSheet);
          return processor.process(grid);
        })
      );
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
      const world = worlds[name];

      return tileGridLoader(world).pipe(
        map((grid) => {
          const entityFactory = new EntityFactory(
            entitySpriteSheets,
            grid,
            entities
          );

          for (let y = 0; y < world.tiles.length; y++) {
            const row = world.entities[y];

            if (!row) continue;

            for (let x = 0; x < row.length; x++) {
              const symbol = row.charAt(x);
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
