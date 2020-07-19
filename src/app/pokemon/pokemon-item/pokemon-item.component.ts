import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../pokemon.model'

@Component({
  selector: 'fin-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css']
})
export class PokemonItemComponent implements OnInit {
  @Input() pokemon: Pokemon;
  constructor() { }

  ngOnInit(): void {
  }

}
