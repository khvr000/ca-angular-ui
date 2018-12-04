import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  url = 'https://id6arpcbo3.execute-api.us-east-1.amazonaws.com/first/testapp';

  newPostCalltestUrl = 'https://5aj1l4dikl.execute-api.ap-south-1.amazonaws.com/test/helloworld';
  randURl = 'https://id6arpcbo3.execute-api.us-east-1.amazonaws.com/first/testapp';
  constructor(private http: HttpClient) { }

  setSearchKeyWord (keyword: string) {
    const body = {'key2': keyword};
    return this.http.post(this.newPostCalltestUrl, body);
  }



}
