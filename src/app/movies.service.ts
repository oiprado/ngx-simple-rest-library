import { Injectable } from "@angular/core";
import { Get } from "projects/ngx-simple-rest/src/lib/get";
import { Post } from "projects/ngx-simple-rest/src/lib/post";
import { Put } from "projects/ngx-simple-rest/src/lib/put";
import { Resource, SimpleRest } from "projects/ngx-simple-rest/src/public_api";
import { Observable } from "rxjs";
import { AppSettings } from "./configuration";

@Injectable()
@Resource({
  host: AppSettings.HOST_REST_API,
  basePath: "/movies",
  trace: true
})
export class MovieService extends SimpleRest<any> {

  @Get({
    name: "/{group}/{movie}?token={token}",
    appendBody: false
  })
  movie(movieId: number): Observable<any> {
    localStorage.setItem("token", "0dbb3f6f-a4a4-4357-ada4-d7f9608e29eb";
      this.resolve(this, { group: "horror", movie: movieId});
      return null;
  }

  @Post({
    name: "?token={token}",
    appendBody: true
  })
  newMovie(body){
    this.resolve(this);
  }

  @Put({
    name: "/"
  })
  update(body){
    this.resolve(this);
  }

}