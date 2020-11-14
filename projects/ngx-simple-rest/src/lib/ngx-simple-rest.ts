import { forEach, isNil, replace, forEachObjIndexed, find, propEq } from 'ramda';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Inject } from '@angular/core';
import { MethodInfo } from './method-info';
import { ResourceInfo } from './resource-info';
import { UrlNormalizer } from './url-normalizer';

export abstract class SimpleRest<T> {

  private resourceApi: any;
  private _httpClient: HttpClient;
  private trace: boolean = false;

  resourceInfo: ResourceInfo;
  methodInfo: MethodInfo;
  body: any;


  constructor(
    @Inject(HttpClient) $httpClient: HttpClient
  ) {
    this._httpClient = $httpClient;
    this.onInit();
  }

  protected resolveResourceApi(): any {
    return {};
  }

  protected getApiName(): string {
    return "";
  }

  protected onInit(): void { }

  protected unauthorized(error): void { }

  protected badRequest(error): void { }

  protected internalServerError(error): void { }

  protected unhandleError(error): void { }

  protected pageable(routeName: string, page: number, size: number, body?, options?) { }

  protected resolve(resource, body?: any, requestParams?: boolean, options?)  {
    this.resourceInfo = resource.resource();
    let url = new UrlNormalizer(
      this.resourceInfo,
      this.methodInfo,
      body
    ).normalize();

    this.requestNew(
      url,
      body,
      this.resourceInfo,
      this.methodInfo,
      requestParams,
      options
    )

    console.log(url);
  }

  protected invokeResource(resource, body?: any): Observable<any> {

    this.resourceInfo = resource.resource();
    this.trace = this.resourceInfo.trace;

    return this.request(
      this.buildUrlFromResource(this.resourceInfo, this.methodInfo),
      body,
      this.methodInfo.type,
      this.resourceInfo.useToken,
      this.resourceInfo.useBasicAuth,
      null,
      this.methodInfo.requestParams,
      this.methodInfo.headers
    ).pipe
      (
        tap(response => response), 
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          return Observable.throw(error);
        })
      );
  }

  protected resolveResource<T>(resource: string, body?, options?): Observable<T> {

    this.resourceApi = this.resolveResourceApi();

    const apiResource: any = this.resourceApi[this.getApiName()];

    const resourceAPI: any = find(propEq('name', resource))(apiResource.resources);

    if (!isNil(apiResource)) {

      const { host, basePath, useToken, useBasicAuth, token, trace } = apiResource;

      if (!isNil(trace)) {
        this.trace = trace; body;
      }

      if (!isNil(resourceAPI)) {

        const { resource, method, header, requestParams } = resourceAPI;
        const url = this.buildUrl(host, basePath, resource);

        return this.request(url, body, method, useToken, useBasicAuth, token, requestParams, header).pipe
          (
            tap(response => response)
            , catchError((error: HttpErrorResponse) => {
              this.handleError(error);
              return Observable.throw(error);
            })
          );
      }
    }
  }

  protected resolveApi(resource: string, body?, options?): Observable<any> {

    this.resourceApi = this.resolveResourceApi();

    const apiResource: any = this.resourceApi[this.getApiName()];

    const resourceAPI: any = find(propEq('name', resource))(apiResource.resources);

    if (!isNil(apiResource)) {

      const { host, basePath, useToken, useBasicAuth, token, trace } = apiResource;

      if (!isNil(trace)) {
        this.trace = trace;
      }

      if (!isNil(resourceAPI)) {

        const { resource, method, header, requestParams } = resourceAPI;
        const url = this.buildUrl(host, basePath, resource);

        return this.request(url, body, method, useToken, useBasicAuth, token, requestParams, header).pipe
          (
            tap(response => response)
            , catchError((error: HttpErrorResponse) => {
              this.handleError(error);
              return null;
            })
          );
      }
    }
  }

  private buildUrlFromResource = (resourceInfo: ResourceInfo, methodInfo: MethodInfo): string => {

    return this.buildUrl(resourceInfo.host, resourceInfo.basePath, methodInfo.name);

  }

  private buildUrl = (host: string, basePath: string, resource: string): string => {

    const url = `${host}${basePath}${resource}`;

    return url;
  }

  private requestNew = (url: string, resourceInfo: ResourceInfo, methodInfo: MethodInfo, requestParams: boolean,body?, options?) : Observable<any> => {
    let headers: HttpHeaders = new HttpHeaders();

    if (resourceInfo.useToken) {
      // token = `Bearer ${localStorage.getItem('access_token') || sessionStorage.getItem('access_token')} `;
    }

    // if (!isNil(token)) {
    //   headers = headers.append('Authorization', token);
    // }

    if (!isNil(options)) {
      const propertiesForEach = (item) => {
        headers = headers.append(item.name, item.value);
      };
      forEach(propertiesForEach, options);
    }

    if (isNil(requestParams)) {
      requestParams = false;
    }

    if (requestParams) {
      body = this.convertToParams(body);
    }

    if (this.trace) {
      console.log("----------");
      console.log(`url: ${url}`);
      console.log(`useBasicAuth: ${resourceInfo.useBasicAuth}`);
      console.log(`useToken: ${resourceInfo.useToken}`);
      // console.log(`token: ${resourceInfo.token}`);
      console.log(`method type: ${methodInfo.type}`);
      console.log(`Request param: ${requestParams}`);
      console.log(`body:\n`);
      console.log(`\t${body}`);
      const showHeaders = (item) => {
        console.log(`${item.name}: ${item.value}`);
      };

      forEach(showHeaders, options);
      console.log("----------");
    }

    let method = methodInfo.type;

    if (method === "post-params") {
      return this.postParams(url, this.convertToParams(body), headers);
    } else if (method === "post") {
      return this.post(url, body, requestParams, headers);
    } else if (method === "put") {
      return this.put(url, body, headers);
    } else if (method === "get") {
      return this.get(url, body, requestParams, headers);
    } else if (method === "get-url") {
      return this.getUrl(url, body, headers);
    } else if (method === "delete") {
      return this.delete(url, body, headers);
    }
  }

  private request = (url: string, body, method: string, useToken: boolean, useBasicAuth: boolean, token: string, requestParams: boolean, options?): Observable<any> => {

    let headers: HttpHeaders = new HttpHeaders();

    if (useToken) {
      token = `Bearer ${localStorage.getItem('access_token') || sessionStorage.getItem('access_token')} `;
    }

    if (!isNil(token)) {
      headers = headers.append('Authorization', token);
    }

    if (!isNil(options)) {
      const propertiesForEach = (item) => {
        headers = headers.append(item.name, item.value);
      };
      forEach(propertiesForEach, options);
    }

    if (isNil(requestParams)) {
      requestParams = false;
    }

    if (requestParams) {
      body = this.convertToParams(body);
    }

    if (this.trace) {
      console.log("----------");
      console.log(`url: ${url}`);
      console.log(`useBasicAuth: ${useBasicAuth}`);
      console.log(`useToken: ${useToken}`);
      console.log(`token: ${token}`);
      console.log(`method: ${method}`);
      console.log(`Request param: ${requestParams}`);
      console.log(`body:\n`);
      console.log(`\t${body}`);
      const showHeaders = (item) => {
        console.log(`${item.name}: ${item.value}`);
      };

      forEach(showHeaders, options);
      console.log("----------");
    }

    if (method === "post-params") {
      return this.postParams(url, this.convertToParams(body), headers);
    } else if (method === "post") {
      return this.post(url, body, requestParams, headers);
    } else if (method === "put") {
      return this.put(url, body, headers);
    } else if (method === "get") {
      return this.get(url, body, requestParams, headers);
    } else if (method === "get-url") {
      return this.getUrl(url, body, headers);
    } else if (method === "delete") {
      return this.delete(url, body, headers);
    }
  }

  private convertToParams(body): String {

    const params = new URLSearchParams();

    Object.keys(body).forEach((key) => {
      params.append(key, body[key]);
    });

    return params.toString();
  }


  private postParams = (url: string, params, headers: HttpHeaders): Observable<Object> => {

    url = `${url}?${params}`;
    return this._httpClient.post(url, null, { headers: headers });
  }

  private post = (url: string, body, requestParams: boolean, headers: HttpHeaders): Observable<Object> => {

    if (requestParams) {
      url = `${url}?${body}`;
      body = null;
    }

    return this._httpClient.post<Object>(url, body, { headers: headers });
  }

  private get = (url: string, body, requestParams: boolean, headers: HttpHeaders): Observable<Object> => {

    if (requestParams) {
      url = `${url}?${body}`;
    }

    return this._httpClient.get(url, { headers: headers, });
  }

  private getUrl = (url: string, body, headers: HttpHeaders): Observable<Object> => {

    return this._httpClient.get(this.urlResolve(url, body), { headers: headers });
  }

  private put = (url: string, body, headers: HttpHeaders): Observable<Object> => {
    return this._httpClient.put(url, body, { headers: headers });
  }

  private delete = (url: string, body, headers: HttpHeaders): Observable<Object> => {
    return this._httpClient.delete(url, { headers: headers });
  }

  private urlResolve(url: string, body: Object): string {

    const urlResolve = (value, key) => {
      url = replace(`{${key}}`, value, url);
    };
    forEachObjIndexed(urlResolve, body);
    return url;
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