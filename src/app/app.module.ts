import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayFieldComponent } from './play-field/play-field.component';
import { PlayCellComponent } from './play-cell/play-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayFieldComponent,
    PlayCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
