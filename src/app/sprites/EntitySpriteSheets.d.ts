import { Entities } from "../Entities/Entities";
import SpriteSheet from "./SpriteSheet";

export type EntitySpriteSheets = { [name in Entities]: SpriteSheet };
