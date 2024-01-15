import { Component , Input} from '@angular/core';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent {
  @Input() searchQuery: string = '';

onSearch(query: string): void {
  this.searchQuery = query;
}
}
