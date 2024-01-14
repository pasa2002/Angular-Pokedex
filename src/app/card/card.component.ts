import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
import {
  debounceTime,
  distinctUntilChanged,
  take,
  takeUntil,
} from 'rxjs/operators';
import { Subject } from 'rxjs';

interface Pokemon {
  currentPokemonType: any;
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: {
    front_default: string;
    official_artwork: {
      front_default: string;
    };
  };
  backgroundTypeColor: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  isLoading: boolean = false;
  private unsubscribe$ = new Subject<void>();
  pokemonList: Pokemon[] = [];
  currentPokemon: any;
  currentPokemonType: string | undefined;

  constructor(
    private pokemonService: ServicesService,
    private scrollDispatcher: ScrollDispatcher
  ) {}

  ngOnInit(): void {
    this.getPokemonData(this.pokemonService.initialUrl);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }



  getPokemonData(url: string) {
    this.isLoading = true;

    this.pokemonService
      .getData(url)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data) => {
          this.pokemonList = data.results;
          this.getPokemonDetails(this.pokemonList);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching Pokemon data:', error);
          this.isLoading = false;
        }
      );
  }

  private offset = 50; // Start from 51st Pokemon for the next load



  loadMorePokemon() {
    console.log('Attempting to load more Pokémon...');
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    const limit = 30;
    const newUrl = `https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${limit}`;

    this.pokemonService
      .getData(newUrl)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data) => {
          console.log('Fetched additional Pokémon:', data.results);
          const newPokemonList = data.results;
          this.getPokemonDetails(newPokemonList);
          this.pokemonList = [...this.pokemonList, ...newPokemonList];
          this.isLoading = false;
          this.offset += limit; // Update the offset here
        },
        (error) => {
          console.error('Error fetching more Pokemon data:', error);
          this.isLoading = false;
        }
      );
  }


  getPokemonDetails(pokemonList: any[]) {
    pokemonList.forEach((pokemon: any, index: number) => {
      this.pokemonService.getData(pokemon.url).subscribe(
        (details) => {
          // Add the additional details to the existing Pokémon object
          Object.assign(pokemon, details);

          // Set the background color for the current Pokemon
          pokemon.backgroundTypeColor = this.getBackgroundColor(
            pokemon.types[0]?.type
          );

          // Set the current Pokemon type for the template using the index
          pokemon.currentPokemonType = pokemon.types[0]?.type.name;
        },
        (error) => {
          console.error(`Error fetching details for ${pokemon.name}:`, error);
        }
      );
    });
  }

  typeName: any;

  getBackgroundColor(type: any): string {
    this.typeName = type.name;
    console.log('Type:', this.typeName);

    switch (this.typeName) {
      case 'grass':
        return '#a7e8bd';
      case 'fire':
        return '#ff7477';
      case 'water':
        return '#bad7f2';
      case 'electric':
        return '#f4f482';
      case 'normal':
        return '#d6d2d2';
      case 'fighting':
        return '#f25757';
      case 'flying':
        return '#90f3ff';
      case 'poison':
        return '#c287e8';
      case 'ground':
        return '#f7ef81';
      case 'rock':
        return '#dddfdf';
      case 'bug':
        return '#fcf4dd';
      case 'ghost':
        return '#c46df7';
      case 'psychic':
        return '#ff70a6';
      case 'ice':
        return '#b2c9ff';
      case 'dragon':
        return '#9381ff';
      case 'dark':
        return '#fbbb8d';
      case 'steel':
        return '#d0dbef';
      case 'fairy':
        return '#ff97c4';
      default:
        return 'rgba(0, 0, 0, 1)';
    }
  }
}
