
import { Account } from './model/account.model';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SimpleRest } from '../../projects/ngx-simple-rest/src/lib/ngx-simple-rest';
import { Resource } from '../../projects/ngx-simple-rest/src/lib/resource';
import { Method } from '../../projects/ngx-simple-rest/src/lib/method';
import { configFile } from './config';

const HOST: string = configFile().HOST;

@Resource( { 
  host: HOST,
  basePath: "/api/user",
  useToken: true
})
@Injectable()
export class UserService extends SimpleRest<any>{

  // user: User;
  // menu: MenuBar[];

  user: Account;
  menu: any[];

  onInit() {
    this.init();
  }

  init() {
    this.user = {
      id: null,
      username: null,
      credentialsExpired: null,
      accountInfo: {
        firstName: null,
        lastName: null,
        fullName: "null",
        email: null,
      }
    };
  }

  @Method({ 
    name: "/create",
    type: "post", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ] 
  })
  create(account: Account): Observable<any> {
    return this.invokeResource(this, account);
  }

  @Method({ 
    name: "/edit",
    type: "post", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ] 
  })
  edit(account: Account): Observable<any> {
    return this.invokeResource(this, account);
  }

  @Method({ 
    name: "/delete",
    type: "post", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ] 
  })
  remove(account: Account): Observable<any> {
    return this.invokeResource(this, account);
  }
  
  @Method({ 
    name: "/getAll",
    type: "get", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ] 
  })
  getAll(account: Account): Observable<any> {
    return this.invokeResource(this, account);
  }
  
  @Method({ 
    name: "/findById/{id}",
    type: "get-url", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" },
      {name: "Authentication", value: "Bearer 589fe416-124c-47f8-80a9-a1a2ad9d4ad8"}
    ] 
  })
  findById(id: number): Observable<any> {
    return this.invokeResource(this, { id: id });
  }

  @Method({ 
    name: "/addProfile",
    type: "post", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ] 
  })
  addProfile(account: Account): Observable<any> {
    return this.invokeResource(this, account);
  }

  @Method({ 
    name: "/getProfilesByUserAccountId",
    type: "getUrl", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ] 
  })
  getProfilesByUserAccountId(id: number): Observable<any> {
    return this.invokeResource(this, { id: id });
  }

  @Method({ 
    name: "/getUnAssignedProfilesByUserAccountId",
    type: "getUrl", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ] 
  })
  getUnAssignedProfilesByUserAccountId(id: number): Observable<any> {
    return this.invokeResource(this, { id: id });
  }

  @Method({ 
    name: "/addRole",
    type: "post", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ] 
  })
  addRole(account: Account): Observable<any> {
    return this.invokeResource(this, account);
  }

  @Method({ 
    name: "/getRolesByUserAccountId",
    type: "getUrl", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ] 
  })
  getRolesByUserAccountId(id: number): Observable<any> {
    return this.invokeResource(this, { id: id });
  }

  @Method({ 
    name: "/getUnAssignedRolesByUserAccountId",
    type: "getUrl", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ] 
  })
  getUnAssignedRolesByUserAccountId(id: number): Observable<any> {
    return this.invokeResource(this, { id: id });
  }

  @Method({ 
    name: "/getOptions",
    type: "get", 
    
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ] 
  })
  getOptions(): Observable<any> {
    return this.invokeResource(this);
  }

}