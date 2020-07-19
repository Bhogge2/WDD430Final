import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from './pokemon.model';


@Pipe({
  name: 'pokemonFilter',
  pure: false
})
export class PokemonFilterPipe implements PipeTransform {

  transform(pokemon: Pokemon[], term: string): any {
    let filteredArray: Pokemon[] = [];

    if (term && term.length > 0) {

      filteredArray = pokemon.filter(
        (pokemon: Pokemon) => pokemon.name.toLowerCase().includes(term.toLowerCase())
      );
    }

      if (filteredArray.length < 1) {
        return pokemon;
      }

      return filteredArray;
    }

}
