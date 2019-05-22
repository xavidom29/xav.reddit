import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { ApiService } from '../services/api.service'
import { DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: Object[] = [{}]
  subs: any;
  posts: Object[]

  constructor(public _http: HttpClient, public _router: Router, public _api: ApiService, public _sanitizer: DomSanitizer) {

    this.subs = this._api.get("https://cors-anywhere.herokuapp.com/https://www.reddit.com/r/popular/new.json")
      .subscribe((apiResult) => {
        this.data = apiResult.data.children;
        console.log(apiResult)
        this.cleanData()
      }
    )

  }

  //MODIFICA TIMESTAMP
  getTime(time: number): string {
    // Funcion para crear la fecha time ago
    if (typeof time === "string"){
      var dateNumber: number = parseInt(time)
    } else {
      dateNumber = time;
    }
  var ahorita: number = new Date().getTime();
  var seconds: number = Math.floor((ahorita - dateNumber * 1000) / 1000);
  var interval: number = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}
  //MODIFICA TEXTO
  getWords(str: string): string {
    return (str != undefined ? str.split(/\s+/).slice(0, 35).join(" ") : "");
  }
  //LIMPIEZA DE DATOS
  cleanData() {
    let clearObj: Object[] = [];
    for (let i = 0; i < this.data.length; i++) {
      let newObj = {
        canal: this.data[i]["data"]["subreddit_name_prefixed"],
        autor: this.data[i]["data"]["author"],
        title: this.data[i]["data"]["title"],
        media: this.data[i]["data"]["url"],
        text: this.data[i]["data"]["selftext"],
        time: this.data[i]["data"]["created_utc"],
        type: ""


      }
      newObj.type = (newObj.media.indexOf('you') != -1 ? "video" : (newObj.media.indexOf("i.redd.it") != -1 ? "image" : "post"))

      if(newObj.type === "video"){
        console.log(newObj['media'])
      }

      clearObj.push(newObj)
    }
    this.posts = clearObj
    console.log(clearObj)

  }
// VIDEOS YOUTUBE
transform(url: string) {
   return this._sanitizer.bypassSecurityTrustResourceUrl(url);
 }
}
