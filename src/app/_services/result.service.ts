import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ResultService {

    pieChartOneUrl = 'https://idjetwuuuk.execute-api.ap-south-1.amazonaws.com/first/graphquery';

    barStackedChartUrl = 'https://idjetwuuuk.execute-api.ap-south-1.amazonaws.com/first/graphqueryonfollowerscount';

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

    getStackBarChartData (jobId) {
        const body = {
            'jobId' : 'a8b2b460-e199-4089-8fee-1ea41339ba8f'
        }
        return this.http.post(this.barStackedChartUrl, body);
    }



}
