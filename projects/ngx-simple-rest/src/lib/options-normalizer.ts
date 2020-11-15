import { HttpHeaders } from "@angular/common/http";
import { MethodInfo } from "./method-info";
import { ResourceInfo } from "./resource-info";

export class OptionsNormalizer{

    private resourceInfo: ResourceInfo;
    private methodInfo: MethodInfo;

    constructor(resourceInfo: ResourceInfo, methodInfo: MethodInfo){
        this.resourceInfo = resourceInfo;
        this.methodInfo = methodInfo;
    }

    normalize(): any {
        
        let headers: HttpHeaders = new HttpHeaders();
        let options;
        let token: string = undefined;

        if (this.resourceInfo.useToken) {
            token = `Bearer ${localStorage.getItem('access_token') || sessionStorage.getItem('access_token')} `;
        }
    
        if (token) {
            headers = headers.append('Authorization', token);
        }

        if (this.methodInfo.headers) {
            let httpHeaders = this.methodInfo.headers;
            httpHeaders.forEach(element => {
                headers = headers.append(element.name, element.value);
            });
          }

        // if (this.methodInfo.options) {
        //     let options2 = this.methodInfo.options;
        //     if(Array.isArray(options2)){
        //         options2.forEach(element => {
                    
        //         });
        //     } else {
        //       Object.keys(this.methodInfo.options).forEach((key) => {
        //         let value = {}
        //       });
        //     }
        // }

        options = Object.assign({ headers },  this.methodInfo.options );

        return options;

    }
}