import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { CardData } from '../game-table/game-table.component';

@Component({
  selector: 'app-card-back',
  templateUrl: './card-back.component.html',
  styleUrls: ['./card-back.component.css'],
  animations: [
    trigger('showHide', [
      state(
        'show',
        style({
          display: 'block',
          opacity: 1
        })
      ),
      state(
        'hide',
        style({
          display: 'block',
          opacity: 0
        })
      ),
      transition('show => hide', [animate('0.3s')]),
      transition('hide => show', [animate('0.3s')])
    ])
  ]
})
export class CardBackComponent implements OnInit {
  cardState = 'show';
  cardTurned = false;


  @Input() cardData: CardData;

  constructor() { }

  onAnimationDoneEvent() {
    if (this.cardState === 'hide') {
      this.cardTurned = !this.cardTurned;
      this.cardState = 'show';
    }
  }

  onTurnCardEvent() {
    this.cardState = 'hide';
  }

  ngOnInit() {
  }

}
