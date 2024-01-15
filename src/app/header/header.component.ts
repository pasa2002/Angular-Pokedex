import { Component , EventEmitter, Output} from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  toggleDarkTheme():void{
    document.body.classList.toggle('dark-mode')
  }

  searchQuery: string = '';
  @Output() searchEvent = new EventEmitter<string>();

  constructor(private pokemonService: ServicesService) {}

  onSearch(): void {
    this.searchEvent.emit(this.searchQuery.trim());
  }
}
