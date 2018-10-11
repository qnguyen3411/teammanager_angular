import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {
  players: Object[] = [];
  playerToDelete: Object = null;
  constructor(private _httpService: HttpService){}

  ngOnInit() {
    this.fetchPlayers();
  }

  fetchPlayers() {
    this._httpService.getPlayers().subscribe(response => {
      if (response['status'] == "success") {
        this.players = response['data'] as Array<Object>
      }
    })
  }

  // onDelete(player) {
  //   console.log("DELETIN PLAYER", player)
  //   this._httpService.deletePlayer(player['_id']).subscribe(response => {
  //     this.fetchPlayers();
  //   })
  // }

  setPlayerToDelete(player) {
    this.playerToDelete = player;
  }

  deletePlayer(player) {
    this._httpService.deletePlayer(player['_id']).subscribe(response => {
      this.fetchPlayers();
    })
    this.playerToDelete = null;
  }

  cancelDelete(player) {
    this.playerToDelete = null;
  }


}
