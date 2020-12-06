import { Component } from '@angular/core';
import { MovieService } from './movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-simple-rest-library';

  constructor(
    private _movieService: MovieService) {

  }

  async getMovies() {
    await this._movieService.movie(1).subscribe(data => {
      console.log(data);
    });
    console.log("consulta");
  }

  async post() {
    await this._movieService.newMovie({id: 1, name: "my name", type: 3}).subscribe(data => {
      console.log(data);
    });
  }

  post2() {
    this._movieService.newMovie2({id: 1, name: "my name", type: 3}).subscribe(data => {
      console.log(data);
    });
  }

  logIn() { 
    // this._OAuthService.authenticate({ username: "oiprado", password: "admin", remember: true });
  }

  getOptions() {
    // this._UserService.findById(16).subscribe(response => {
    //   console.log(response);
    // });
  }

  create() {
    // this.groupResource.create(
    //   {
    //     name: "SALES",
    //     active: "Y"
    //   }
    // ).subscribe(response => {
    //   console.log(response);
    // });
  }

  edit() {
    // this.groupResource.edit(
    //   {
    //     id: 2,
    //     name: "SALES",
    //     active: "N"
    //   }
    // ).subscribe(response => {
    //   console.log(response);
    // });
  }

  remove() {
    // this.groupResource.remove(
    //   {
    //     id: 2,
    //     name: "SALES",
    //     active: "N"
    //   }
    // ).subscribe(response => {
    //   console.log(response);
    // });
  }

  addUserToGroup() {
    // this.groupResource.addUser({
    //     account: {
    //       id: 15
    //     },
    //     group: {
    //       id: 1
    //     }
    //   }
    // ).subscribe(response => {
    //   console.log( response );
    // })
  }

  findAll() {
    // this.groupResource.find().subscribe(response => {
    //   console.log(response);
    // });
  }

  findById() {

    // this.groupResource.findById(1).subscribe(response => {
    //   console.log(response);
    // });

  }

}
