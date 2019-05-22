import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public _http: HttpClient, public _router: Router) { }

  get(url: string, headers:any = {'Content-Type':  'application/json'}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(headers)
    };
    return this._http.get(url, httpOptions)
  }
  showDocu() {

    this._router.navigateByUrl('/home')
  }
}
