import { Observable } from "rxjs";
import { AbstractRequest } from "./abstract-request";

export class PutRequest extends AbstractRequest {
    execute(): Observable<Object> {

        return this._httpClient.put(this._url, this._body, this._options);       
    }
    
}