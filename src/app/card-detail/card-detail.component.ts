import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { PokemonUtilityService } from '../services/pokemon-utility.service';
import { CurrentPokemonService } from '../services/current-pokemon.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {
  pokemon: any;
  currentPokemonId: number = 1; // Initialize with a default value

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: ServicesService,
    private currentPokemonService: CurrentPokemonService,
    private pokemonUtilityService: PokemonUtilityService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.currentPokemonId = +id;
      this.loadPokemon(this.currentPokemonId);
    } else {
      // Handle the case where 'id' is not available
      // You might want to redirect the user or load a default Pokémon
    }
  }

  loadPokemon(id: number) {
    this.pokemonService.getData(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .subscribe(data => {
        this.pokemon = data;
        this.pokemon.backgroundTypeColor = this.pokemonUtilityService.getBackgroundColor(this.pokemon.types[0]?.type);
        this.currentPokemonService.changePokemonId(id);
      });
  }

  goToNextPokemon() {
    this.currentPokemonId++;

    this.loadPokemon(this.currentPokemonId);
    this.router.navigate(['/pokemon', this.currentPokemonId]);
  }

  goToPreviousPokemon() {
    if (this.currentPokemonId > 1) {
      this.currentPokemonId--;
      this.loadPokemon(this.currentPokemonId);
      this.router.navigate(['/pokemon', this.currentPokemonId]);
    }
  }
}
