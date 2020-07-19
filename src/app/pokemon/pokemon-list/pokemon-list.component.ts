import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pokemon } from '../pokemon.model';
import { PokemonService } from '../pokemon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fin-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  pokemon: Pokemon[] = [];
  subscription: Subscription;
  term: string;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.subscription = this.pokemonService.pokemonListChangedEvent.subscribe(
      (pokemon: Pokemon[]) => {
        this.pokemon = pokemon;
      }
    );

    this.pokemonService.getPokemons();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onKeyPress(value: string) {
    this.term = value;
  }

}
