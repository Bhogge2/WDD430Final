import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../pokemon.model';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'fin-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon;
  id: string;
  nativeWindow: any;

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.pokemon = this.pokemonService.getPokemon(this.id);
      }
    );
  }

  onDelete() {
    this.pokemonService.deletePokemon(this.pokemon);
    this.router.navigateByUrl('/pokemon');
  }

}
