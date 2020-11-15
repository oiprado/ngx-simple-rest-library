import { ResourceInfo } from './resource-info';

export function Resource(resourceInfo: ResourceInfo) {
  resourceInfo.useToken = resourceInfo.useToken ? resourceInfo.useToken: false;
  resourceInfo.useBasicAuth = resourceInfo.useBasicAuth? resourceInfo.useBasicAuth : false;
  resourceInfo.trace = resourceInfo.trace? resourceInfo.trace: false;

  return function (target) {
    Object.defineProperty(target.prototype, 'resource', { value: () => resourceInfo});
  }
  
}
