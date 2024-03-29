import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CardComponent } from './card/card.component';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FirstPageComponent } from './first-page/first-page.component';
import { HeaderDetailComponent } from './header-detail/header-detail.component';
import { PowerComponent } from './power/power.component';
import { PokeStatComponent } from './poke-stat/poke-stat.component';
import { NgChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EvolutionComponent } from './evolution/evolution.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardComponent,
    CardDetailComponent,
    FirstPageComponent,
    HeaderDetailComponent,
    PowerComponent,
    PokeStatComponent,
    EvolutionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"pokedex-8a140","appId":"1:961314472961:web:d7639f240fdbb95b2aac00","storageBucket":"pokedex-8a140.appspot.com","apiKey":"AIzaSyDN9YcMY3NCAKuMltglcYejL2n5sqxRaYw","authDomain":"pokedex-8a140.firebaseapp.com","messagingSenderId":"961314472961"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    NgChartsModule,
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
