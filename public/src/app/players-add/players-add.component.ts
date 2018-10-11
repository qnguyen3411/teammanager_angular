import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-players-add',
  templateUrl: './players-add.component.html',
  styleUrls: ['./players-add.component.css']
})
export class PlayersAddComponent implements OnInit {
  error = false;
  postData = {"name": "", "position": ""};
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router){}
  
  ngOnInit() {
  }

  onSubmit() {
    this._httpService.addPlayer(this.postData).subscribe(response => {
      if (response['status'] == "error") {
        this.error = true;
      } else {
        this._router.navigate(['../list'], {relativeTo: this._route})
      }
    })
  }
  postDataIsInvalid() {
    return this.postData['name'].length < 2;
  }

}
