import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { HeaderComponent } from './header/header.component';
import { PokemonDetailComponent } from './pokemon/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonItemComponent } from './pokemon/pokemon-item/pokemon-item.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';
import { PokemonFilterPipe } from './pokemon/pokemon-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    HeaderComponent,
    PokemonDetailComponent,
    PokemonListComponent,
    PokemonItemComponent,
    PokemonEditComponent,
    PokemonFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
