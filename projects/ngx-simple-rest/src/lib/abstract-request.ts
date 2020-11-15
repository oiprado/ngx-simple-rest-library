import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MethodInfo } from "./method-info";

export abstract class AbstractRequest {

    protected _httpClient: HttpClient;
    protected _url: string;
    protected _body: any;
    protected _methodInfo: MethodInfo;
    protected _options: any;
    
    constructor(httpClient: HttpClient, url: string, body: any, methodInfo: MethodInfo, options: any) {
        this._httpClient = httpClient;
        this._url = url;
        this._body = body;
        this._methodInfo = methodInfo;
        this._options = options;
    }
    abstract execute(): Observable<Object>;

}