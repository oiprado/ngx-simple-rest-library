import { ResourceInfo } from './resource-info';

export function Resource(resourceInfo: ResourceInfo) {
  return function (target) {
    Object.defineProperty(target.prototype, 'resource', { value: () => resourceInfo});
  }
}
