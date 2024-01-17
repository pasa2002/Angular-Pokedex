import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { PokemonUtilityService } from '../services/pokemon-utility.service';
import { CurrentPokemonService } from '../services/current-pokemon.service';
import { Subscription } from 'rxjs';
interface PokemonEvolution {
  name: string;
  id: number;
  imageUrl: string;
  level: number | null;
}

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.scss']
})
export class EvolutionComponent implements OnInit {
  pokemon: any;
  evolutions: PokemonEvolution[] = [];
  private subscription = new Subscription();
  constructor(
    private pokemonService: ServicesService,
    private pokemonUtilityService: PokemonUtilityService,
    private route: ActivatedRoute,
    private currentPokemonService: CurrentPokemonService,
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.currentPokemonService.currentPokemonId.subscribe(id => {
        this.evolutions = []; // Clear the array on new ID
        this.loadEvolutionData(id);
      })
    );
  }

  private loadEvolutionData(pokemonId: number) {
    // First, get the basic Pokémon data to access the species URL
    this.pokemonService.getData(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).subscribe(pokemonData => {
      // Clear existing evolutions
      this.evolutions = [];

      // Fetch the species data
      this.pokemonService.getData(pokemonData.species.url).subscribe(speciesData => {
        // Fetch the evolution chain
        this.pokemonService.getData(speciesData.evolution_chain.url).subscribe(evolutionChainData => {
          // Now you have the evolution chain data, process it
          this.processEvolutionData(evolutionChainData.chain);
        });
      });
    });
  }

  private fetchEvolutionData(speciesUrl: string) {
    this.pokemonService.getData(speciesUrl)
      .subscribe(speciesData => {
        this.pokemonService.getData(speciesData.evolution_chain.url)
          .subscribe(evolutionData => {
            this.processEvolutionData(evolutionData.chain);
          });
      });
  }

  private processEvolutionData(evolutionChain: any) {

    this.evolutions = [];
    let currentStage = evolutionChain;
    while(currentStage) {
      this.evolutions.push({
        name: currentStage.species.name,
        id: this.extractIdFromUrl(currentStage.species.url),
        imageUrl: `https://img.pokemondb.net/artwork/${currentStage.species.name}.jpg`, // Example image URL
        level: currentStage.evolution_details[0]?.min_level
      });
      currentStage = currentStage.evolves_to[0];
    }
  }

  private extractIdFromUrl(url: string): number {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? parseInt(matches[1]) : 0;
  }
}
