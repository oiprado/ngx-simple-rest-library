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
    name: "/{group}/{movie}?access_token={access_token}",
    headers: [
      { name: "TENANT_ID", value: "xxx-xxx-xxx" }
    ]
  })
  movie(movieId: number): Observable<any> {

    localStorage.setItem("token", "0dbb3f6f-a4a4-4357-ada4-d7f9608e29eb");
    localStorage.setItem("access_token", "9f77b83c-2f09-475d-afce-afde9a0dbcba");
    return this.resolve(this, { group: "horror", movie: movieId, page: 0, size: 10});
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