import { MethodInfo } from "./method-info";
import { ResourceInfo } from "./resource-info";
import { Token } from "./token";

export class UrlNormalizer {

    private resourceInfo: ResourceInfo;
    private methodInfo: MethodInfo;
    private tokens: Token[] = [];
    private body: any;

    constructor(resourceInfo: ResourceInfo, methodInfo: MethodInfo, body){
        this.resourceInfo = resourceInfo;
        this.methodInfo = methodInfo;
        this.body = body;
        this.tokens = [];
    }

    normalize() {

        let url = `${this.resourceInfo.host}${this.resourceInfo.basePath}${this.methodInfo.name}`;
        var grupos;
        const regex = /{([^}]*)}/g;

        while ((grupos = regex.exec(url)) !== null) {
            this.tokens.push({ token:  grupos[0],  value: grupos[1] });
        }

        this.tokens.forEach(tokenize => {
            url = url.replace( tokenize.token, this.searchToken(tokenize) );
        });
        
        return url;
    }

    private searchToken(token: Token): string {

        let value = this.body[token.value];

        if(value === undefined || value === null){
            value = localStorage.getItem(token.value);
        }
        return value;
    }

}