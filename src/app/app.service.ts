import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  url = 'https://id6arpcbo3.execute-api.us-east-1.amazonaws.com/first/testapp';
  constructor(private http: HttpClient) { }

  setSearchKeyWord (keyword: string) {
    const body = {'message': 'java'};
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', 'true');
    return this.http.post(this.url, body);
  }


}
