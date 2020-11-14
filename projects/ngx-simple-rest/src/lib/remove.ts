import { MethodInfo } from "./method-info";

export function Remove(methodInfo: MethodInfo) {
    methodInfo.type = "remove";
      return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;  
        descriptor.value = function (...args: any[]) {
            
            this.methodInfo = methodInfo;
            let result = originalMethod.apply(this, args);
            return result;
        }
      }
    
    }