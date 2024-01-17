import { Component, OnInit } from '@angular/core';
import { PokemonUtilityService } from '../services/pokemon-utility.service';
import { ServicesService } from '../services/services.service';
import { ActivatedRoute } from '@angular/router';

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
  ){}

  ngOnInit(){
    const pokemonId = this.route.snapshot.paramMap.get('id');
    console.log(pokemonId)

    this.pokrmonService.getData(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .subscribe(data=>{
      this.pokemon = data;
      console.log(data);
      this.pokemon.backgroundTypeColor = this.pokemonUtilityService.getBackgroundColor(this.pokemon.types[0]?.type);
    })
  }
}
