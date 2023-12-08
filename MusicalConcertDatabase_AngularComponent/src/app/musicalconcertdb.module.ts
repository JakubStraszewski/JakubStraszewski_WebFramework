import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';
import { MusicalconcertdbComponent } from './musicalconcertdb.component';

@NgModule({
  declarations: [
    MusicalconcertdbComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [MusicalconcertdbComponent]
})
export class AppModule { }
