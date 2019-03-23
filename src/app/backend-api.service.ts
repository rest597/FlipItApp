import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Endpoints
export const baseBackendURL = 'http://localhost:3000';

export const gamePath: string = baseBackendURL + '/game';
export const scorePath: string = baseBackendURL + '/score';

export interface GameResponse {
  pictures: Array<string>;
  token: string;
}

export interface ScoreRequest {
  steps: number;
  seconds: number;
  name: string;
  token: string;
}

export interface ScoreResponse {
  position: number;
}

export interface Score {
  steps: number;
  seconds: number;
  name: string;
}

const httpOptions = {
  headers: new Headers({
    'X-Content-Type': 'application/json',
    Accept: 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  constructor(public http: Http) {}

  getNewGame(size: number): Observable<GameResponse> {
    return this.http
      .get(gamePath + '/' + size, httpOptions)
      .pipe(map(res => res.json()));
  }

  addNewScore(reqData: ScoreRequest): Observable<ScoreResponse> {
    return this.http
      .post(scorePath, reqData, httpOptions)
      .pipe(map(res => res.json()));
  }

  getHighscore(): Observable<Array<Score>> {
    return this.http.get(scorePath, httpOptions).pipe(map(res => res.json()));
  }
}
