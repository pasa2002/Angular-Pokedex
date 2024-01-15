import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent {
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: ServicesService
  ) {}

  ngOnInit() {
    const pokemonId = this.route.snapshot.paramMap.get('id');
    this.pokemonService.getData(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .subscribe(data => {
        this.pokemon = data;
      });
  }
}
