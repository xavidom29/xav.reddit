import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { DataService } from '../services/data.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit {

  id: number;
  sub: any;
  post: {}
  constructor(public _api: ApiService, public _route: ActivatedRoute,public _data: DataService) { }






  ngOnInit() {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
      this.post = this._data.posts[this.id];


  })

  }
  ngDestroy() {
    this.sub.unsubscribe()
  }

}
