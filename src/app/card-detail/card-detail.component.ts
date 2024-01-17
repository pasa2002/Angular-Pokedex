import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { PokemonUtilityService } from '../services/pokemon-utility.service';
import { Pokemonin } from '../models/pokemonin.models';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit{
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: ServicesService,
    private pokemonUtitlityService: PokemonUtilityService
  ) {}

  ngOnInit() {
    const pokemonId = this.route.snapshot.paramMap.get('id');
    this.pokemonService.getData(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .subscribe(data => {
        this.pokemon = data;
        this.pokemon.backgroundTypeColor = this.pokemonUtitlityService.getBackgroundColor(this.pokemon.types[0]?.type);
      });
  }
}
