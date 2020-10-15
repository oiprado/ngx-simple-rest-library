import { MethodInfo } from "./method-info";
import { ResourceInfo } from './resource-info';
import { SimpleRest } from './ngx-simple-rest';

/**
	Decorator that permit tag an request type
**/

export function PostMethod(methodInfo: MethodInfo) {
  
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    let originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        
        this.methodInfo = methodInfo;
        let result = originalMethod.apply(this, args);

        return result;
    }
    
  }

}


/**
	End Decorator that permit tag an request type
**/
