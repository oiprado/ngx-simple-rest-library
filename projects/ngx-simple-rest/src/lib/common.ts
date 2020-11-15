import { MethodInfo } from "./method-info";
import { ResourceInfo } from "./resource-info";

export const separatorAppendBodyCharacter = (url: string): string => {
    let separatorCharacter = "";
    separatorCharacter = (url.search("\\?") !== -1 ? "&" : "?");
    return separatorCharacter;
  };

export const convertToParams = (body): string  =>{

  const params = new URLSearchParams();

  Object.keys(body).forEach((key) => {
    params.append(key, body[key]);
  });

  return params.toString();
}

export const log = (resourceInfo: ResourceInfo, url: string, methodInfo: MethodInfo, body: any) => {
  if (resourceInfo.trace) {
    console.log("----------");
    console.log(`url: ${url}`);
    console.log(`useBasicAuth: ${resourceInfo.useBasicAuth}`);
    console.log(`useToken: ${resourceInfo.useToken}`);
    console.log(`methodType: ${methodInfo.type}`);
    console.log(`appendBody: ${methodInfo.appendBody}`);
    console.log(`body:\n`);
    console.log(body);

    if (methodInfo.options) {
      var options = methodInfo.options;
      if (Array.isArray(options)) {
        options.forEach(item => {
          console.log(`${item.name}: ${item.value}`);
        });
      } else {
        console.log(methodInfo.options);
      }
    }

    if (methodInfo.headers) {
      let headers = methodInfo.headers;
      headers.forEach(item => {
        console.log(`${item.name}: ${item.value}`);
      });
    }

    console.log("----------");
  }
}