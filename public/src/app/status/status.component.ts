import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @Output('updateDataEvent')
  updateDataEvent = new EventEmitter<Object>();

  @Input() playersToShow = []

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
    this._router.navigate(['game', 1], { relativeTo: this._route })
  }

  dataFromChild(data) {
    console.log("CALLING FROM STATUS COMPONENT")
    console.log(data)
  }

}
