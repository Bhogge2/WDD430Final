import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PokemonService } from '../pokemon.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Pokemon } from '../pokemon.model';

@Component({
  selector: 'fin-pokemon-edit',
  templateUrl: './pokemon-edit.component.html',
  styleUrls: ['./pokemon-edit.component.css']
})
export class PokemonEditComponent implements OnInit {
  id: string;
  editMode:boolean = false;
  originalPokemon: Pokemon;
  Pokemon: Pokemon;

  constructor(private pokemonService: PokemonService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']

      if(!this.id) {
        this.editMode = false;
        return;
      }

      this.originalPokemon = this.pokemonService.getPokemon(this.id);
      if(!this.originalPokemon) {
        return;
      }

      this.editMode = true;
      this.Pokemon = JSON.parse(JSON.stringify(this.originalPokemon));

    });
  }

  onCancel() {
    this.router.navigate(['/pokemon']);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newPokemon = new Pokemon(
      value.id,
      value.name,
      value.type1,
      value.type2,
      value.sprite
    );



    if(this.editMode) {
      this.pokemonService.updatePokemon(this.originalPokemon, newPokemon);
    } else {
      this.pokemonService.addPokemon(newPokemon);
    }

    this.router.navigate(['/pokemon']);
  }

  isInvalidPokemon(newPokemon: Pokemon) {
    if (!newPokemon) {
      return true;
    }

    if (this.Pokemon && newPokemon.id === this.Pokemon.id) {
      return true;
    }
  }


}
