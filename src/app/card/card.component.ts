import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  SimpleChanges,
} from '@angular/core';
import { ServicesService } from '../services/services.service';
import { ScrollDispatcher} from '@angular/cdk/scrolling';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CardDetailComponent } from '../card-detail/card-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { PokemonUtilityService } from '../services/pokemon-utility.service';
import { Pokemonin } from '../models/pokemonin.models';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  isLoading: boolean = false;
  private unsubscribe$ = new Subject<void>();
  pokemonList: Pokemonin[] = [];
  currentPokemon: any;
  currentPokemonType: string | undefined;

  @Input() searchQuery: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchQuery']) {
      this.filterPokemon();
    }
  }

  filterPokemon() {
    if (!this.searchQuery) {
      // Reset to original list if search query is empty
      this.getPokemonData(this.pokemonService.initialUrl);
    } else {
      // Filter logic here
      this.pokemonList = this.pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  constructor(
    private pokemonService: ServicesService,
    private scrollDispatcher: ScrollDispatcher,
    private dialog:MatDialog,
    private pokemonUtilityService: PokemonUtilityService
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
          pokemon.backgroundTypeColor = this.pokemonUtilityService.getBackgroundColor(
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



  openDialog(pokemon: any): void {
    this.dialog.open(CardDetailComponent, {
      width: '250px',
      data: pokemon
    });
}}
