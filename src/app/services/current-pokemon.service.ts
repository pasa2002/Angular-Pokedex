import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentPokemonService {
  private currentPokemonIdSource = new BehaviorSubject<number>(1);
  currentPokemonId = this.currentPokemonIdSource.asObservable();

  constructor() {}

  changePokemonId(id: number) {
    this.currentPokemonIdSource.next(id);
  }
}
