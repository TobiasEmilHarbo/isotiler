import { Observable } from "rxjs";
import { Entities } from "../Entities/Entities";
import SpriteSheet from "./SpriteSheet";

export type EntitySpriteSheetObservables = {
  [name in Entities]: Observable<SpriteSheet>;
};
