import { Entities } from "./Entities/Entities";

const symbolSpriteMap = new Map<string, string>();
symbolSpriteMap.set(",", "grass");
symbolSpriteMap.set("f", "dry-grass");

export const symbolSpriteMapper = symbolSpriteMap;

const symbolEntityMap = new Map<string, Entities>();
symbolEntityMap.set("t", Entities.TREE);

export const symbolEntityMapper = symbolEntityMap;
