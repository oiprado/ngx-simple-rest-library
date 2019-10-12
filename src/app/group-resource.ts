
import { Resource } from '../../projects/ngx-simple-rest/src/lib/resource';
import { Method } from '../../projects/ngx-simple-rest/src/lib/method';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestGroup } from './model/request-group.model';
import { Group } from './model/group.model';
import { configFile } from './config';

import { SimpleRest } from '../../projects/ngx-simple-rest/src/lib/ngx-simple-rest';

const HOST: string = configFile().HOST;

@Resource( { 
    host: HOST,
    basePath: "/api/group"
  }
)
@Injectable()
export class GroupResource extends SimpleRest<any> {

  onInit(): void { }
  
  @Method({ 
    name: "/create",
    type: "post", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ] 
  })
  create(body: Group): Observable<any> { 
    return this.invokeResource(this, body); 
  }

  @Method({ 
    type:  "post", 
    name: "/edit",
    requestParams: false,
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ]   
  })
  edit(group: Group ): Observable<any> {
    return this.invokeResource(this, group);
  }

  @Method({ 
    type: "post", 
    name: "/delete",
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ] 
  })
  remove(body: Group): Observable<any> { 
    return this.invokeResource(this, body); 
  }

  @Method({ 
    name :"/findAll", 
    type :  "get"
  })
  find(): Observable<any> {
    return this.invokeResource(this);
  }

  @Method({ 
    type: "get",
    name: "/findAll",
    requestParams: false,
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
      // { name: "Authorization", value: "Basic c3ByaW5nLXNlY3VyaXR5LW9hdXRoMi1yZWFkLXdyaXRlLWNsaWVudDpzcHJpbmctc2VjdXJpdHktb2F1dGgyLXJlYWQtd3JpdGUtY2xpZW50LXBhc3N3b3JkMTIzNA::" }
    ] 
  })
  findAll(): Observable<any> { 
    return this.invokeResource(this);
  }

  @Method({ 
    name :"/findById/{id}", 
    type :  "getUrl",
  })
  findById(id: number ) : Observable<any> {
    return this.invokeResource(this, { id: id });
  }

  @Method( { name :"/addUser", type :  "post" })
  addUser( requestGroup: RequestGroup): Observable<any> {
    return this.invokeResource(this, requestGroup);
  }

  @Method({ name :"/removeUser", type :  "post" })
  removeUser( requestGroup: RequestGroup): Observable<any> {
    return this.invokeResource(this, requestGroup);
  }

  @Method({ name :"/getAssignedUsers", type :  "post" })
  getAssignedUsers( group: Group): Observable<any> {
    return this.invokeResource(this, group);
  }
  
  @Method({ name :"/getUnAssignedUsers", type :  "post" })
  getUnAssignedUsers( group: Group ): Observable<any> {
    return this.invokeResource(this, group);
  }

  @Method({ name :"/addProfile", type :  "post" })
  addProfile( requestGroup: RequestGroup ): Observable<any> {
    return this.invokeResource(this, requestGroup);
  }

  @Method({ name :"/removeProfile", type :  "post" })
  removeProfile( requestGroup: RequestGroup ): Observable<any> {
    return this.invokeResource(this, requestGroup);
  }
  
  @Method({ name :"/getAssignedProfiles", type :  "post" })
  getAssignedProfiles( group: Group ): Observable<any>{
    return this.invokeResource(this, group);
  }
  
  @Method({ name :"/getUnAssignedProfiles", type :  "post" })
  getUnAssignedProfiles( group: Group ): Observable<any> {
    return this.invokeResource(this, group);
  }

}