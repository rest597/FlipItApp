import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameTableComponent } from './game-table/game-table.component';

const routes: Routes = [{ path: 'game-table', component: GameTableComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
