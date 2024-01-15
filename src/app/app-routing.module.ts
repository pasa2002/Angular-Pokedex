import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardComponent } from './card/card.component';
import { FirstPageComponent } from './first-page/first-page.component';

const routes: Routes = [
  {
    path:'',
    component:FirstPageComponent
  },
  {
    path:'pokemon/:id',
    component:CardDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
