import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(private _http: HttpClient){

  }

  getPlayers() {
    return this._http.get('/api/players');
  }

  addPlayer(data) {
    return this._http.post('/api/players', data);
  }

  updatePlayer(id, data) {
    return this._http.put('/api/players/' + id, data);
  }

  deletePlayer(id) {
    return this._http.delete('/api/players/' + id);
  }
}
