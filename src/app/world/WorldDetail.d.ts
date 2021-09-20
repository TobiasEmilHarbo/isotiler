export type WorldDetail = {
  spriteSheet: {
    name: string;
    types: Array<{
      name: string;
      sprites: Array<{
        x: number;
        y: number;
      }>;
    }>;
  };
  tiles: Array<string>;
  entities: Array<string>;
};
