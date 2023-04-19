import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DrinklistComponent } from './drinklist/drinklist.component';
import { HttpClientModule  } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    DrinklistComponent
  ],
  imports: [
    BrowserModule, HttpClientModule , FormsModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
