import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ResultService {

    pieChartOneUrl = 'https://idjetwuuuk.execute-api.ap-south-1.amazonaws.com/first/graphquery';


    constructor(private http: HttpClient) { }

    getFirstPieChartData (jobId) {
        const body = {
            'jobId':  jobId,
            'verified' : false
        }	;
        return this.http.post(this.pieChartOneUrl, body);
    }

    getSecondPieChartData (jobId) {
        const body = {
            'jobId':  jobId,
            'verified' : true
        }	;
        return this.http.post(this.pieChartOneUrl, body);
    }



}
