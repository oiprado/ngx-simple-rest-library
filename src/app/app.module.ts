import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import { NgxSimpleRestModule } from 'projects/ngx-simple-rest/src/public_api';
// import { NgxWebstorageModule } from 'ngx-webstorage';
import { MovieService } from './movies.service';

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
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
