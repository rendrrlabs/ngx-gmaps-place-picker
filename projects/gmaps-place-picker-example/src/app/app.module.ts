import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgxGmapsPlacePickerModule } from "ngx-gmaps-place-picker";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxGmapsPlacePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
