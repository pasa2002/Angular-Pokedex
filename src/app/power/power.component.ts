import { Component ,OnInit} from '@angular/core';
import { PokemonUtilityService } from '../services/pokemon-utility.service';
import { ServicesService } from '../services/services.service';
import { ActivatedRoute } from '@angular/router';
import { CurrentPokemonService } from '../services/current-pokemon.service';



@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.scss']
})
export class PowerComponent implements OnInit{

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

// const pokemonId = this.route.snapshot.paramMap.get('id');
// console.log(pokemonId)
