import { MethodInfo } from "./method-info";
import { ResourceInfo } from './resource-info';
import { SimpleRest } from './ngx-simple-rest';

export function Method(methodInfo: MethodInfo) {
  
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    let originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        
        this.methodInfo = methodInfo;
        let result = originalMethod.apply(this, args);

        return result;
    }
    
  }

}