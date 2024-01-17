import { Component, OnInit } from '@angular/core';
import { PokemonUtilityService } from '../services/pokemon-utility.service';
import { ServicesService } from '../services/services.service';
import { ActivatedRoute } from '@angular/router';
import { CurrentPokemonService } from '../services/current-pokemon.service';

@Component({
  selector: 'app-poke-stat',
  templateUrl: './poke-stat.component.html',
  styleUrls: ['./poke-stat.component.scss']
})
export class PokeStatComponent implements OnInit{
  pokemon: any;

  constructor(
    private pokrmonService: ServicesService,
    private pokemonUtilityService: PokemonUtilityService,
    private route: ActivatedRoute,
    private currentPokemonService: CurrentPokemonService,
  ){}

  ngOnInit(): void {


    this.currentPokemonService.currentPokemonId.subscribe(id => {
      this.pokrmonService.getData(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .subscribe(data => {
      this.pokemon = data;
      console.log(data);
      this.pokemon.backgroundTypeColor = this.pokemonUtilityService.getBackgroundColor(this.pokemon.types[0]?.type);

      })
  })



}
}
