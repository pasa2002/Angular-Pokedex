import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {



  constructor(private https:HttpClient) { }

  initialUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=50';

  getData(url:string){
    return this.https.get<any>(url);
  }
}
