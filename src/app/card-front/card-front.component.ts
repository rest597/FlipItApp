import { Component, OnInit, Input } from '@angular/core';
import { CardData } from '../game-table/game-table.component';

@Component({
  selector: 'app-card-front',
  templateUrl: './card-front.component.html',
  styleUrls: ['./card-front.component.css']
})
export class CardFrontComponent implements OnInit {

  @Input() cardImage: CardData;

  constructor() { }

  ngOnInit() {
  }

}
