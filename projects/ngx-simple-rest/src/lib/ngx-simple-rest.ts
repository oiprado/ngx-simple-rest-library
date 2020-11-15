import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Inject } from '@angular/core';
import { MethodInfo } from './method-info';
import { ResourceInfo } from './resource-info';
import { UrlNormalizer } from './url-normalizer';
import { AbstractRequest } from './abstract-request';
import { PostRequest } from './post-request';
import { PutRequest } from './put-request';
import { GetRequest } from './get-request';
import { DeleteRequest } from './delete-request';
import { OptionsNormalizer } from './options-normalizer';
import { log } from './common';

export abstract class SimpleRest<T> {

  private _httpClient: HttpClient;
  private body: any;
  private resourceInfo: ResourceInfo;
  private methodInfo: MethodInfo;


  constructor(
    @Inject(HttpClient) $httpClient: HttpClient
  ) {
    this._httpClient = $httpClient;
    this.onInit();
  }

  protected onInit(): void { }

  protected unauthorized(error): void { }

  protected badRequest(error): void { }

  protected internalServerError(error): void { }

  protected unhandleError(error): void { }

  // TODO: implement pageable option
  protected pageable(routeName: string, page: number, size: number, body?, options?) { }

  protected resolve(resource, body?: any) {

    this.resourceInfo = resource.resource();
    return this.request(this.resourceInfo,this.methodInfo,body).pipe
    (
      tap(response => response)/*,
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return Observable.throw(error);
      })*/
    );
  }

  private request = (resourceInfo: ResourceInfo, methodInfo: MethodInfo, body?) : Observable<any> => {

    let url = new UrlNormalizer(this.resourceInfo,this.methodInfo,body).normalize();
    let options = new OptionsNormalizer(resourceInfo, methodInfo).normalize();
    
    log(this.resourceInfo, url, this.methodInfo, this.body);

    let methodType = methodInfo.type;
    let abstractRequest: AbstractRequest;

    if (methodType === "post") {
      abstractRequest = new PostRequest(this._httpClient, url, body, methodInfo, options);
    } else if (methodType === "put") {
      abstractRequest = new PutRequest(this._httpClient, url, body, methodInfo, options);
    } else if (methodType === "get") {
      abstractRequest = new GetRequest(this._httpClient, url, body, methodInfo, options);
    } else if(methodType === "delete") {
      abstractRequest = new DeleteRequest(this._httpClient, url, body, methodInfo, options);
    }

    return abstractRequest.execute();

  }

  // tslint:disable-next-line:no-shadowed-variable
  protected handleError(error): void {

    switch (error.status) {
      case 401: {
        this.unauthorized(error);
        break;
      }
      case 400: {
        this.badRequest(error);
        break;
      }
      case 500: {
        this.internalServerError(error);
        break;
      }
      default: {
        this.unhandleError(error);
      }
    }

    return error;
  }

}