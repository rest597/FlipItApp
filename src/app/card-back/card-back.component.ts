import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-back',
  templateUrl: './card-back.component.html',
  styleUrls: ['./card-back.component.css']
})
export class CardBackComponent implements OnInit {

  @Input() cardImage: string;

  constructor() { }

  ngOnInit() {
  }

}
