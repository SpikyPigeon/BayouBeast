import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: string = "http://localhost:55291/api/";

  constructor(private http: HttpClient) {}

  get(ctrl) {
    return this.http.get(this.url + ctrl);
  }

}
