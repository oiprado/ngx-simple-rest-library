

import { HttpClient } from '@angular/common/http';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { SimpleRest } from 'projects/ngx-simple-rest/src/public_api';


// @SimpleRest({ context: "", resource: "" })
export class AppService extends SimpleRest<Object> {
  
  // constructor(
  //   private httpClient: HttpClient,
  //   private localStorage: LocalStorageService,
  //   private sessionStorage: SessionStorageService
  // ) { 
  //     super(httpClient, localStorage, sessionStorage);
  // }

  onInit() {

  }

  resolveResourceApi() {
    return {
      "security": {
        "host": "http://localhost:8081",
        "basePath": "/com.it270.auth/api/group",
        "useBasicAuth": false,
        "useToken": false,
        "trace": true,
        "resources": [
          {
            "name": "findAll",
            "requestParams": false,
            "method": "get",
            "resource": "/findAll",
            "header": 
            [
                // { "name": "Cache-Control", "value": "no-cache" },
                // { "name": "Content-Type", "value": "application/json" }
            ]
          }
        ]
      }
    };
  }  
  
  getApiName(): string {
    return "security";
  }


  public getAllGroups(): Observable<any>{
    return this.resolveApi("findAll");
  }

  public helloWorldWithParameter2(name: string): any {
    let value: any;
    // this.resolveResource<ResponseHelloWorld>("helloWorldWithParameter", { name: name }).tap(
    // )

    return null;
    
  }

  public helloWorldPathVariable(name: string) {
    return this.resolveApi("helloWorldPathVariable", { name: name });
  }

  public helloWorldObjectWithPath(name: string) {
    return this.resolveApi("helloWorldObjectWithPath", {name: name });
  }

  public helloWorldWithPostRequest(name: string) {
    return this.resolveApi("helloWorldWithPostRequest", {name: name });
  }


}