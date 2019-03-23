import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { CardData } from '../game-table/game-table.component';
import { Subject } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';

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
export class CardBackComponent implements OnInit, OnDestroy {
  @Input() cardData: CardData;
  @Output() turnEvent = new EventEmitter<string>();

  cardState = 'show';
  cardStartToTurn = false;
  cardTurned = false;
  cardActive = true;

  @Input() disableCard: Subject<string>;
  @Input() turnbackCard: Subject<string>;

  constructor() {}

  onAnimationDoneEvent() {
    if (this.cardState === 'hide') {
      this.cardTurned = !this.cardTurned;
      this.cardState = 'show';
    }
  }

  onTurnCardEvent() {
    if (!this.cardTurned) {
      this.cardState = 'hide';
      this.cardStartToTurn = true;

      this.turnEvent.emit(this.cardData.id.toString());
    }
  }

  ngOnInit() {
    this.disableCard.subscribe((id: string) => {
      if (this.cardData.id.toString() === id) {
        this.cardActive = false;
        this.cardStartToTurn = false;
      }
    });

    this.turnbackCard.subscribe((id: string) => {
      if (this.cardData.id.toString() === id && this.cardStartToTurn === true) {
        this.cardStartToTurn = false;
        setTimeout(() => (this.cardState = 'hide'), 1000);
      }
    });
  }

  ngOnDestroy() {
    this.disableCard.unsubscribe();
    this.turnbackCard.unsubscribe();
  }
}
