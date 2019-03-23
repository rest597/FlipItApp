import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../backend-api.service';

export interface CardData {
  id: number;
  url: string;
}

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent implements OnInit {
  pictures: Array<CardData>;
  token: string;

  constructor(private backendApi: BackendApiService) {}

  shuffle(a: any) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  ngOnInit() {
    this.backendApi.getNewGame(20).subscribe(res => {
      const deck: Array<CardData> = res.pictures.map((card, ind) => ({
        id: ind,
        url: card
      }));

      const deck2: Array<CardData> = res.pictures.map((card, ind) => ({
        id: ind,
        url: card
      }));

      this.pictures = this.shuffle(deck.concat(deck2));
      this.token = res.token;
    });
  }

  onCardClicked() {
    console.log('yeah');
  }
}
