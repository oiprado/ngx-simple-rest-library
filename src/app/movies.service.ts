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
  useToken: AppSettings.USE_TOKEN,
  trace: AppSettings.TRACE_API
})
export class MovieService extends SimpleRest<any> {

  @Get({
    name: "/{category}/{code}?api_key={access_token}",
    headers: [
    
    ]
  })
  movie(movieId: number): Observable<any> {
    localStorage.setItem("access_token", "18d22f877231eeb12b27cbd32aaab4db");
    return this.resolve(this, { category: "horror", code: movieId, page: 0, size: 10});
  }

  @Post({
    name: "?token={token}",
    appendBody: true
  })
  newMovie(body): Observable<any>{

    return this.resolve(this, body);
  }

  @Post({
    name: "?token={token}",
    appendBody: false
  })
  newMovie2(body): Observable<any>{

    return this.resolve(this, body);
  }

  @Put({
    name: "/"
  })
  update(body){
    this.resolve(this);
  }

}