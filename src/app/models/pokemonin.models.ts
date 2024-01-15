export interface Pokemonin {
  currentPokemonType: any;
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: {
    other: {
      ['official-artwork']: {
        front_default: string;
      }
    }
  };
  backgroundTypeColor: string;
}
