# ngx-simple-rest
> Angular library for easy integration with RESTful APIs.

This package is refactored [ng5-restful](https://github.com/Lujo5/ng5-restful) in a way to use and support newest Angular 6 and RxJs 6 features.

Minimum required versions of dependencies:
* `@angular/core`: `>=6.0.0`
* `@angular/common`: `>=6.0.0`
* `ngx-webstorage`: `^4.0.1`
* `ramda`: `^0.26.1`
* `rxjs`: `>=6.0.0`

## Instalation
Install library into your project using Node package manager (NPM).

```sh
npm i ngx-simple-rest --save
```

## Configuration

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
	...
  ],
  providers: [],
  bootstrap: [AppComponent]
})

##

## Usage
This library ** does not ** contain an angular module with exported components and services, but provides a class:

* ** SimpleRest \ <T> **: is an abstract class that your services must extend to use the REST methods provided

This library aims to minimize the lines of code by providing an abstract class that consumes RESTful services in an easy and fast way. 
And also, it provides a level of consistency to your Angular application.

##

### Creating model
Model classes, which represents resource from your REST API, are created in following way:
(Deserialization will be handled by Angular `HttpClient` request library.)

Exmaple typescript model class (models/article.model.ts):
``` javascript
import {ArticleType} from './article-type.model';

export class Article {
    id: number;
    name: string;
    content: string;
    articleType: ArticleType;
    createdBy: string;
    created: Date;
    updated: Date;
}
```

### Implementing service

#### Decorators
* `@Resource`

This decorator allows you to define the endpoint.

host: string;
basePath: string;
useBasicAuth ?: boolean;
useToken ?: boolean;
trace ?: boolean;

* `@Method`
This decorator allows you to define the name of the resource and type of request
export interface MethodInfo {
    name: string;
    type: string;
    requestParams?: boolean;
    headers?: Header[];
}
export interface Header {
    name: string;
    value: string;
}


 @Method({
    name: "/token",
    type: "post-params", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" },
      { name: "Authorization", value: "Basic c3ByaW5nLXNlY3VyaXR5LW9hdXRoMi1yZWFkLXdyaXRlLWNsaWVudDpzcHJpbmctc2VjdXJpdHktb2F1dGgyLXJlYWQtd3JpdGUtY2xpZW50LXBhc3N3b3JkMTIzNA=="}
    ] 
  })

Example typescript service class (services/token.service.ts):

import { Injectable } from "@angular/core";
import { SimpleRest, Method, Resource } from 'ngx-simple-rest';
import { Token } from '../model/token.model'

@Resource(
  {
    host: "http://localhost:8081/resource",
    basePath: "/oauth"
  }
)
@Injectable()
export class TokenService extends SimpleRest<Token> {


  onInit(){ }

  @Method({
    name: "/token",
    type: "post-params", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" },
      { name: "Authorization", value: "Basic c3ByaW5nLXNlY3VyaXR5LW9hdXRoMi1yZWFkLXdyaXRlLWNsaWVudDpzcHJpbmctc2VjdXJpdHktb2F1dGgyLXJlYWQtd3JpdGUtY2xpZW50LXBhc3N3b3JkMTIzNA=="}
    ] 
  })
  public token(credential){
    return this.invokeResource( this, credential );
  }
  
}

Example typescript service class (services/option.service.ts):
``` javascript
import { Injectable } from "@angular/core";
import { SimpleRest, Resource, Method } from 'ngx-simple-rest';

@Resource(
  {
    host: "http://localhost:8081/resource",
    basePath: "/api/option",
    useToken: true
  }
)
@Injectable()
export class OptionService extends SimpleRest <any>{

  @Method({
    name: "/getOptions",
    type: "get", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ] 
  })
  getOptions(){
    return this.invokeResource( this, {} );
  }

  @Method({
    name: "/edit",
    type: "post", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ] 
  })
  edit(option: any){
    return this.invokeResource( this, option );
  }

  @Method({
    name: "/moveOption",
    type: "post-params", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ] 
  })
  moveOption(from: number, to: number){
    return this.invokeResource( this, { from: from, to: to } );
  }

  @Method({
    name: "/moveToGroup",
    type: "post-params", 
    headers: [
      { name: "Content-Type", value: "application/json" }, 
      { name: "Accept", value: "application/json" }
    ] 
  })
  moveToGroup(option: number, group: string){
    return this.invokeResource( this, { option: option, group: group } );
  }
  

}
```

When performing updateOne(), deleteOne(), createOn() or non-RESTful requests using get(), post(), put(), delete() methods
from RestService, then returned value should be provided as Generic type when calling methods, example class could be
GenericResponse which is packed also in this library. GenericResponse contains three fields:
* **success** - _true_ if request was successful, _false_ otherwise
* **message** - Optional message of requested result from server
* **data** - map with custom values in format: _key -> value_

It's structure is following:
``` javascript
export interface Token {
    access_token: string,
    token_type: string,
    refresh_token: string,
    expires_in: number,
    scope: string
}
```

### Interacting with API
To use your newly created and implemented service, just inject service into the Angular @Component's constructor
and use it as follows:
``` javascript
import {Component, OnInit} from '@angular/core';
import {GenericResponse} from 'ngx-restful';

import {ArticleService} from '../services/article.service';
import {Article} from '../models/article.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TreeDragDropService, TokenService, OptionService]
})
export class AppComponent {

    root: TreeNode[]= [];
    items: MenuItem[];
    selected: TreeNode;
    activeSelected: any;
    loading: boolean = false;

    username: string;
    password: string;

    options: any = {};

    constructor(private _TokenService: TokenService, private _OptionService: OptionService) {

        this.items = [
            {
                title: 'New',
                icon: 'fas fa-plus',
                command: () => {this.save()} 
            },
            {
                icon: 'fas fa-sync',
                title: 'Refresh',
                command: () => {this.refresh()} 
            },
            {
                icon: "fas fa-compress-arrows-alt",
                title: "Ocultar todos",
                command: () => { this.collapseAll() }
            }
            ,
            {
                icon: "fas fa-expand-arrows-alt ",
                title: "Expandir todos",
                command: () => { this.expandAll() }
            }
        ];

    }

    authenticate() {
        this._TokenService.token( { username: this.username, password: this.password, grant_type: "password" }).subscribe(response => {
            sessionStorage.setItem("access_token", response.access_token);
            this.refresh();
        })
    }

    refresh() {
        this.loading = true;
        this.root = [];
        this._OptionService.getOptions().subscribe(response => {
            this.options = response;
        });
    }

    initTree() {
        
        forEach((option: any) => {

            const node: TreeNode  = {
                label: option,
                data: option,
                expandedIcon: "fa fa-folder-open",
                collapsedIcon: "fa fa-folder",
                children: []
            };

            this.root.push(node);
            
            prop(option, this.options).forEach(child => {
                this.exploreChilds(child, node);
            });

        })(Object.keys(this.options));
        this.loading = false;

    }

    private exploreChilds(node: any, parentNode: TreeNode) {

        let treeNode : TreeNode  = {
            label: node.name,
            data: node,
            expandedIcon: "fa fa-folder-open",
            collapsedIcon: "fa fa-folder",
            icon: "fa fa-circle",
            draggable: true,
            droppable: true,
            selectable: true,
            children: []
        };
        if(node.childs !== null && node.childs.length > 0) {
            node.childs.forEach(child => {
                this.exploreChilds(child, treeNode);
            });
        }
        parentNode.children.push(treeNode);
        
    }

    expandAll(){
        this.root.forEach( node => {
            this.expandRecursive(node, true);
        } );
    }

    collapseAll(){
        this.root.forEach( node => {
            this.expandRecursive(node, false);
        } );
    }

    private expandRecursive(node:TreeNode, isExpand:boolean){
        node.expanded = isExpand;
        if(node.children){
            node.children.forEach( childNode => {
                this.expandRecursive(childNode, isExpand);
            } );
        }
    }

    save() {
        this._OptionService.edit(this.selected.data).subscribe(response => {
            this.selected = null;
            this.refresh();
        }, error => {
            console.log(error);
        });
        
    }

    

    onDrop(event) {
        
        if(typeof event.dropNode.data === 'string' && typeof event.dragNode.data === 'string'){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'No es posible mover un grupo a otro grupo!',
              });
        } else {
            if(typeof event.dropNode.data === 'string') {
                const { id} = event.dragNode.data;
                this._OptionService.moveToGroup(id, event.dropNode.data).subscribe(response => {
                    this.refresh();
                    this.selected = null;
                });
                
            } else {
                event.dragNode.data.groupText = null;
                event.dragNode.data.parentNode = event.dropNode.data;
                const from = event.dragNode.data.id;
                const to = event.dropNode.data.id;
                this._OptionService.moveOption(from, to).subscribe(response => {
                    this.refresh();
                    this.selected = null;
                });
            }
            event.accept();
        } 
    }

    onSelected(event) {
        if(typeof this.selected.data !== 'string'){
            this.activeSelected = event.node.active;
        }
    }

    isGroup() {
        if(typeof this.selected.data === 'string') {
            return true
        } else {
            return false;
        }
    }

    removeGroup(){
        this.loading = true;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                this.selected.data.groupText = null;
                
                this._OptionService.edit(this.selected.data).subscribe(response => {
                    this.selected = null;
                    this.refresh();
                });
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          });
          this.loading = false;
    }

}

```

Complete overview of all available methods provided by RestService:

| Service method  | Arguments                                    | HTTP method | URL  | Return type                   |
|:----------------|:---------------------------------------------|:------------|:-----|:------------------------------|
| get             | path: string, *options: object               | GET         | path | Observable\<E>                |
| post            | path: string, body: any, *options: object    | POST        | path | Observable\<E>                |
| put             | path: string, body: any, *options: object    | PUT         | path | Observable\<E>                |
| delete          | path: string, *options: object               | DELETE      | path | Observable\<E>                |
| query           | *options: object, *path: string              | GET         | /    | Observable\<T[]>              |
| getAll          | *path: string                                | GET         | /    | Observable\<T[]>              |
| getResponse     | *options: object, *path: string              | GET         | /    | Observable\<HttpResponse\<T>> |
| getOne          | id: number, *options: object, *path: string  | GET         | /id  | Observable\<T>                |
| createOne       | model: T, *options: object, *path: string    | POST        | /    | Observable\<E>                |
| updateOne       | model: T, *options: object, *path: string    | PUT         | /id  | Observable\<E>                |
| deleteOne       | id: number, *options: object, *path: string  | DELETE      | /id  | Observable\<E>                |

_Parameters marked with * are optional._

_Generic type \<E> could be custom model class or you can use GenericResponse type already provided in this library_

License
- 
MIT
