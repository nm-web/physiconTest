import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectComponent } from './components/select/select.component';
import { CardComponent } from './components/card/card.component';
import { ShowcaseComponent } from './pages/showcase/showcase.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ListToEdgesPipe } from './pipes/list-to-edges.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SelectComponent,
    CardComponent,
    ShowcaseComponent,
    FilterPipe,
    ListToEdgesPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
