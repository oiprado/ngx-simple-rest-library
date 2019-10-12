import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import { NgxSimpleRestModule } from 'projects/ngx-simple-rest/src/public_api';
// import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppService } from './app.service';
import { GroupResource } from './group-resource';
import { OAuthService } from './oauth.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    // NgxSimpleRestModule,
    // NgxWebstorageModule.forRoot() 

  ],
  providers: [
    AppService,
    GroupResource,
    OAuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
