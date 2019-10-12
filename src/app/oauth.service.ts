import { Injectable } from "@angular/core";

import { configFile } from "./config";
import { Resource, SimpleRest, Method } from "projects/ngx-simple-rest/src/public_api";
import { Subject, Observable } from "rxjs";

const HOST: string = configFile().HOST;
const TOKEN: string = configFile().TOKEN;

@Resource(
  {
    host: HOST,
    basePath: "/oauth",
    trace: true
  }
)
@Injectable()
export class OAuthService extends SimpleRest<any>{

  subject: Subject<boolean>;

  onInit() { 
    this.subject = new Subject<boolean>();
  }

  handleError(error) {
    this.subject.next(false);
  }
  
  authenticate(credentials): Observable<boolean> {

    const { username, password, remember } = credentials;
    this.token(username, password).subscribe(response => {
      
      const { access_token } = response;

      if(access_token) {

        console.log(access_token);

        this.cleanStorageToken();
        this.storeAuthenticationToken(access_token, remember);

        this.subject.next(true);

      }
    });

    return this.subject.asObservable();

  }

  @Method({
    name: "/token",
    type: "post", 
    requestParams: true,
    headers: [
      { name: "Authorization", value: TOKEN }
    ] 
  })
  private token(username: string, password: string){
    return this.invokeResource(this, { grant_type: "password", username:username, password: password });
  }

  storeAuthenticationToken(access_token, remember) {

    if(access_token){
      if (remember) {
        localStorage.setItem('access_token', access_token);
      } else {
        sessionStorage.setItem('access_token', access_token);
      }
      return true;
    }

  }

  cleanStorageToken() {
    localStorage.setItem('access_token', "");
    sessionStorage.setItem('access_token', "");
  }

}