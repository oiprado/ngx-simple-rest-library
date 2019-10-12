import { Component } from '@angular/core';
import { AppService } from './app.service';
import { GroupResource } from './group-resource';
import { OAuthService } from './oauth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-simple-rest-library';

  constructor(private groupResource: GroupResource, private _OAuthService: OAuthService, private _UserService: UserService) {

  }


  logIn() { 
    this._OAuthService.authenticate({ username: "oiprado", password: "admin", remember: true });
  }

  getOptions() {
    this._UserService.findById(16).subscribe(response => {
      console.log(response);
    });
  }

  create() {
    this.groupResource.create(
      {
        name: "SALES",
        active: "Y"
      }
    ).subscribe(response => {
      console.log(response);
    });
  }

  edit() {
    this.groupResource.edit(
      {
        id: 2,
        name: "SALES",
        active: "N"
      }
    ).subscribe(response => {
      console.log(response);
    });
  }

  remove() {
    this.groupResource.remove(
      {
        id: 2,
        name: "SALES",
        active: "N"
      }
    ).subscribe(response => {
      console.log(response);
    });
  }

  addUserToGroup() {
    this.groupResource.addUser({
        account: {
          id: 15
        },
        group: {
          id: 1
        }
      }
    ).subscribe(response => {
      console.log( response );
    })
  }

  findAll() {
    this.groupResource.find().subscribe(response => {
      console.log(response);
    });
  }

  findById() {

    this.groupResource.findById(1).subscribe(response => {
      console.log(response);
    });

  }

}
