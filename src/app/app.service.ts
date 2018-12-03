import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  url = 'https://id6arpcbo3.execute-api.us-east-1.amazonaws.com/first/testapp';

  newPostCalltestUrl = 'https://5aj1l4dikl.execute-api.ap-south-1.amazonaws.com/test/helloworld';
  constructor(private http: HttpClient) { }

  setSearchKeyWord (keyword: string) {
    const body = {'message': 'java'};
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', 'true');
    return this.http.post(this.url, body);
  }


  testPostMethod(keyword: string) {
      const body = {'key2': keyword};
    return this.http.post(this.newPostCalltestUrl, body);
  }


}
