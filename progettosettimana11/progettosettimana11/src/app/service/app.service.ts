import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movies } from '../models/movies';
import { Favourite } from '../models/favourite';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<Movies[]>('http://localhost:4201/movies-popular');
  }

  getFavourites(data: Favourite) {
      return this.http.get<Favourite[]>('http://localhost:4201/favourites');
  }
}
