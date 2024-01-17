import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { PokemonUtilityService } from '../services/pokemon-utility.service';

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

  constructor(
    private pokemonService: ServicesService,
    private pokemonUtilityService: PokemonUtilityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const pokemonId = params.get('id');
      this.pokemonService.getData(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .subscribe(pokemonData => {
          this.pokemon = pokemonData;
          this.pokemon.backgroundTypeColor = this.pokemonUtilityService.getBackgroundColor(this.pokemon.types[0]?.type);

          // Fetch evolution data
          this.fetchEvolutionData(this.pokemon.species.url);
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
    // Process the evolution chain to extract relevant data
    // This is a placeholder implementation, you'll need to parse the evolution chain correctly
    // For example:
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
