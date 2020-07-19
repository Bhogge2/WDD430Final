import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon.model';
import { Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemon: Pokemon[] = [];
  pokemonListChangedEvent = new Subject<Pokemon[]>();
  maxPokemonId: number;

  constructor(private http: HttpClient) {
  }

  addPokemon(pokemon: Pokemon) {
    if (!pokemon) {
      return;
    }

    pokemon.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, pokemon: Pokemon }>('http://localhost:3000/pokemon', pokemon, { headers: headers })
      .subscribe(
        (responseData) => {
          pokemon.id = responseData.pokemon.id;
          this.pokemon.push(responseData.pokemon);
          this.sortAndSend();
        }
      )
  }

  deletePokemon(pokemon: Pokemon) {
    if (!pokemon) {
      return;
    }

    const pos = this.pokemon.findIndex(p => p.id === pokemon.id);

    if (pos < 0) {
      return;
    }

    console.log(pos);
    

    this.http.delete('http://localhost:3000/pokemon/' + pokemon.id)
      .subscribe(
        (response: Response) => {
          this.pokemon.splice(pos, 1);
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
          // console.log("IDK what happened");
        }
      )

  }

  getPokemon(id: string): Pokemon {
    for (const pokemon of this.pokemon) {
      if (pokemon.id === id) {
        return pokemon;
      }
    }
    return null;
  }

  getPokemons() {
    this.http.get<{ message: string, pokemon: Pokemon[] }>('http://localhost:3000/pokemon')
      .subscribe(
        pokemonData => {
          this.pokemon = pokemonData.pokemon;
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }


  updatePokemon(originalPokemon: Pokemon, newPokemon: Pokemon) {
    if (!originalPokemon || !newPokemon) {
      return;
    }

    const pos = this.pokemon.findIndex(p => p.id === originalPokemon.id);

    if (pos < 0) {
      return;
    }

    newPokemon.id = originalPokemon.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('http://localhost:3000/pokemon/' + originalPokemon.id, newPokemon, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.pokemon[pos] = newPokemon;
          this.sortAndSend();
        }
      )

  }

  sortAndSend() {
    this.pokemon.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.pokemonListChangedEvent.next(this.pokemon.slice());
  }
}
