import { Component } from '@angular/core';
import { MovieService } from './movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ngx-simple-rest-library';
  LANGUAGE: string = "en-US";
  movieId: number;

  constructor(
    private _movieService: MovieService) {
      
  }

  getMovies() {
    this._movieService.movie(1, 1, "es").subscribe(data => {
      console.log(data);
    });
    console.log("consulta");
  }

  post() {
    this._movieService.newMovie({id: 1, name: "my name", type: 3}).subscribe(data => {
      console.log(data);
    });
  }

  post2() {
    this._movieService.newMovie2({id: 1, name: "my name", type: 3}).subscribe(data => {
      console.log(data);
    });
  }
}
