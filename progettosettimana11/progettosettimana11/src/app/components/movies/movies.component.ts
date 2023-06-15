import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Movies } from 'src/app/models/movies';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];

  constructor(private appservice: AppService, private authService: AuthService) { }

  ngOnInit(): void {
    this.appservice.getMovies().subscribe((movies: Movies[]) => {
      this.movies = movies;
      console.log(this.movies);
    });
  }

}
