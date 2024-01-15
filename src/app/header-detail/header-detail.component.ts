import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-detail',
  templateUrl: './header-detail.component.html',
  styleUrls: ['./header-detail.component.scss']
})
export class HeaderDetailComponent {

  constructor(private router: Router) {}

  backToCard() {
    this.router.navigate(['']);
  }

}
