import { Component, OnInit } from '@angular/core';
import { BackendApiService, ScoreRequest } from '../backend-api.service';
import { Subject } from 'rxjs';
import { timeout } from 'rxjs/operators';

export interface CardData {
  id: number;
  url: string;
  display: boolean;
}

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent implements OnInit {
  deck: Array<CardData>;
  token: string;

  turnedCard: string = '';
  disableCard: Subject<string> = new Subject<string>();
  turnBackCard: Subject<string> = new Subject<string>();

  activeGame = true;
  timeoutId: any;
  seconds = 0;

  steps = 0;

  constructor(private backendApi: BackendApiService) {}

  timer() {
    this.timeoutId = setTimeout(() => {
      this.updateTime(); // update Model
      this.timer();
    }, 1000);
  }

  updateTime() {
    this.seconds++;
  }

  clearTimer() {
    this.seconds = 0;
  }

  stopTimer() {
    clearTimeout(this.timeoutId);
    this.activeGame = false;
  }

  startTimer() {
    this.timer();
    this.activeGame = false;
  }

  shuffle(a: any) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  ngOnInit() {
    this.backendApi.getNewGame(6).subscribe(res => {
      const deck: Array<CardData> = res.pictures.map((card, ind) => ({
        id: ind,
        url: card,
        display: true
      }));

      const deck2: Array<CardData> = res.pictures.map((card, ind) => ({
        id: ind,
        url: card,
        display: true
      }));

      this.startTimer();
      this.deck = this.shuffle(deck.concat(deck2));
      this.token = res.token;
    });
  }

  onTurnEvent(id: string) {
    this.steps++;
    if (this.turnedCard === '') {
      console.log('new card turned');
      this.turnedCard = id;
    } else if (this.turnedCard === id) {
      console.log('remove cards');

      for (let i = 0; i < this.deck.length; i++) {
        if (this.deck[i].id.toString() === id) {
          this.deck[i].display = false;
        }
      }

      let isGameOver = true;
      for (let i = 0; i < this.deck.length; i++) {
        if (this.deck[i].display === true) {
          isGameOver = false;
        }
      }

      this.disableCard.next(id);
      this.turnedCard = '';

      if (isGameOver) {
        console.log('GAME OVER!!');
        this.stopTimer();
        const score: ScoreRequest = {
          seconds: this.seconds,
          steps: this.steps,
          name: 'Player',
          token: this.token
        };

        alert('Good job!! \nTime: ' + this.seconds + '\nSteps: ' + this.steps);

        this.backendApi.addNewScore(score).subscribe(res => {
          alert('Great success!! \nPosition: ' + res.position);
        });
      }
    } else {
      // turn back
      console.log('turn back');
      this.turnBackCard.next(this.turnedCard);
      this.turnBackCard.next(id);
      this.turnedCard = '';
    }
  }
}
