import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonDetailComponent } from './pokemon/pokemon-detail/pokemon-detail.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';


const routes: Routes = [
  { path: '', redirectTo: '/pokemon', pathMatch: 'full' },
    {
        path: 'pokemon', component: PokemonComponent, children:
            [
                { path: 'new', component: PokemonEditComponent },
                { path: ':id', component: PokemonDetailComponent },
                { path: ':id/edit', component: PokemonEditComponent },
            ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
