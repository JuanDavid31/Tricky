import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TableroComponent } from './tablero/tablero.component';
import { CasillaComponent } from './casilla/casilla.component';


@NgModule({
  declarations: [
    AppComponent,
    TableroComponent,
    CasillaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
