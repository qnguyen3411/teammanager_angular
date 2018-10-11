import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { PlayersComponent } from './players/players.component';
import { PlayersAddComponent } from './players-add/players-add.component';
import { PlayersListComponent } from './players-list/players-list.component';
import { StatusComponent } from './status/status.component';


const routes: Routes = [
  { path: 'players', component: PlayersComponent, children: [
    { path: 'list', component: PlayersListComponent },
    { path: 'add', component: PlayersAddComponent }
  ]},
  { path: 'status', component: StatusComponent, children: [
    { path: 'game/:id', component: GameComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
