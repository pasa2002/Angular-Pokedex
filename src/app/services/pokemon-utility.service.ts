import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonUtilityService {

  constructor() { }

  typeName: any;

  getBackgroundColor(type: any): string {
    this.typeName = type.name;

    switch (this.typeName) {
      case 'grass':
        return '#a7e8bd';
      case 'fire':
        return '#ff7477';
      case 'water':
        return '#bad7f2';
      case 'electric':
        return '#EEC759';
      case 'normal':
        return '#d6d2d2';
      case 'fighting':
        return '#f25757';
      case 'flying':
        return '#90f3ff';
      case 'poison':
        return '#c287e8';
      case 'ground':
        return '#f7ef81';
      case 'rock':
        return '#E86A33';
      case 'bug':
        return '#E4C478';
      case 'ghost':
        return '#c46df7';
      case 'psychic':
        return '#ff70a6';
      case 'ice':
        return '#b2c9ff';
      case 'dragon':
        return '#9381ff';
      case 'dark':
        return '#fbbb8d';
      case 'steel':
        return '#d0dbef';
      case 'fairy':
        return '#ff97c4';
      default:
        return 'rgba(0, 0, 0, 1)';
    }
  }
}
