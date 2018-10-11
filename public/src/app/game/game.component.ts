import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  players: Array<Object> = []
  
  key = "game"
  
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.key = 'game' + params['id']
      console.log(this.key)
    });
    this.fetchPlayers();
  }

  fetchPlayers() {
    this._httpService.getPlayers().subscribe(response => {
      if (response['status'] == "success") {
        this.players = response['data'] as Array<Object>
        console.log(this.players)
      }
    })
  }

  setToPlayerStatus(buttonText, statusNum) {
    if (statusNum == -1 && buttonText == "notPlaying") {
      return "danger";
    }
    if (statusNum == 0 && buttonText == "undecided") {
      return "warning";
    }
    if (statusNum == 1 && buttonText == "playing") {
      return "success";
    }
    return "disabled";
  }

  onUpdate(buttonText, player) {
    const dict = {
      'notPlaying': -1,
      'playing': 1,
      'undecided': 0
    }

    player[this.key] = dict[buttonText];
    const data = {game1: player['game1'], game2: player['game2'], game3: player['game3']}
    this._httpService.updatePlayer(player['_id'], data)
    .subscribe()
  }
}
