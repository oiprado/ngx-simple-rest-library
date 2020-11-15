import { Observable } from "rxjs";
import { AbstractRequest } from "./abstract-request";
import { convertToParams, separatorAppendBodyCharacter } from "./common";

export class GetRequest extends AbstractRequest {
    execute(): Observable<Object> {

      if (this._methodInfo.appendBody) {
        this._body = convertToParams(this._body);
      }

        let separatorCharacter = "";
        if (this._methodInfo.appendBody) {
          separatorCharacter = separatorAppendBodyCharacter(this._url);
          this._url =  `${this._url}${separatorCharacter}${this._body}`;
        }
        return this._httpClient.get(this._url, this._options);
        
    }
    
}