import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from "rxjs/operators";
import {saveJobModel} from "./_models/saveJobModel";

@Injectable({
  providedIn: 'root',
})
export class AppService {
  url = 'https://id6arpcbo3.execute-api.us-east-1.amazonaws.com/first/testapp';

  newPostCalltestUrl = 'http://13.233.124.213:5000/checkpost';
  saveJobIdUrl = 'https://8nv3z5xrj7.execute-api.ap-south-1.amazonaws.com/stage01/ca/savejobid';
  randURl = 'https://id6arpcbo3.execute-api.us-east-1.amazonaws.com/first/testapp';
  getJobIdsUrl = 'https://8nv3z5xrj7.execute-api.ap-south-1.amazonaws.com/stage01/ca/getjobids'
  constructor(private http: HttpClient) { }

  setSearchtrackWord (keyword: string) {
    const body = {
        'track':  [keyword],
        'name' : 'Akshay'
    }	;
    return this.http.post(this.newPostCalltestUrl, body,{responseType: 'text'}, );
  }

    saveJobId (jobDetails) {
        return this.http.post(this.saveJobIdUrl, jobDetails);
  }
  getJobIds (userDetails) {
    return this.http.post(this.getJobIdsUrl, userDetails);
  }
}
