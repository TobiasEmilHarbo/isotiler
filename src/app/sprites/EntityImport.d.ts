import { Entities } from "../Entities/Entities";

export type EntityImport = {
  [name in Entities]: {
    sprite: string;
  };
};
