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
  basePath: "/movie",
  useToken: AppSettings.USE_TOKEN,
  trace: AppSettings.TRACE_API
})
export class MovieService extends SimpleRest<any> {

  @Get({ name: "/{movie_id}/lists?api_key={api_key}&language={language}&page={page}" })
  movie(movieId: number, page: number, language: string): Observable<any> {
    return this.resolve(this, { movie_id: movieId, api_key: AppSettings.MOVIES_API_KEY, page: page, language: language });
  }

  @Get({ name: "/{movie_id}?api_key={api_key}&language={language}" })
  getMovieDetail(movieId: number, language: string) {
    return this.resolve(this, { api_key: AppSettings.MOVIES_API_KEY, movie_id: movieId,language: language });
  }

  @Post({ name: "?token={token}", appendBody: false })
  newMovie(body): Observable<any>{
    return this.resolve(this, body);
  }

  @Post({ name: "?token={token}", appendBody: false })
  newMovie2(body): Observable<any>{
    return this.resolve(this, body);
  }

  @Put({ name: "/"  })
  update(body){
    this.resolve(this);
  }

}