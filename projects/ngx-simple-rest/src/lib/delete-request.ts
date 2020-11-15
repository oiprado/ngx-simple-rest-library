import { Observable } from "rxjs";
import { AbstractRequest } from "./abstract-request";

export class DeleteRequest extends AbstractRequest {
    execute(): Observable<Object> {

        return this._httpClient.delete(this._url, this._body);       
    }
    
}