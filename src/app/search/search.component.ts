import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../_models/user';
import {AppService} from '../app.service';
import {UserService} from '../_services/user.service';
import {SharedProperties} from '../_services/sharedProperties';
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {AlertService} from "../_services/alert.service";

export interface PeriodicElement {
    time: string;
    trackWord: string;
    View: string;
    jobId: string;
}
/*
* {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'H'},
 {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'He'},
 {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'Li'},
 {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'Be'},
 {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'B'},
 {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'C'},
 {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'N'}*/
let ELEMENT_DATA = [];

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    displayedColumns: string[] = ['trackWord', 'time', 'View'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource: any;
    currentUser: User;
    users: User[] = [];
    loading = false;

    title = 'ci-angular-ui';
    term;
    userDetails: any;
    newterm;
    responseJobId: string;

    constructor (private appService: AppService,
                 private alertService: AlertService,
                 private router: Router) {}

    ngOnInit() {
        this.loading = false;
        this.userDetails = JSON.parse(localStorage.getItem('userDetails'));

        this.getJobDetails();

    }
    getJobDetails() {
        this.appService.getJobIds(this.userDetails).subscribe(res => {
           console.log('response', typeof res);
           const peopleArray = Object.keys(res).map(i => res[i]);
           console.log( peopleArray);
           ELEMENT_DATA = peopleArray;
           console.log('Elements Data', ELEMENT_DATA);
           this.dataSource = ELEMENT_DATA;
           this.dataSource.paginator = this.paginator;
           this.loading = true;
        });
    }
    setSearchtrackWord(trackWord: string) {
        this.appService.setSearchtrackWord(trackWord).subscribe(res => {
            this.responseJobId = res;
            console.log(this.userDetails);
            var receivedJobDetails = {
                'username': this.userDetails['username'],
                'jobId': this.responseJobId,
                'trackWord': trackWord,
                'time': JSON.stringify(new Date())
            }
            this.saveJobId(receivedJobDetails);
        });
    }
    viewResult(element) {
        console.log(element);
        this.router.navigate(['home/results', element.jobId]);
    }


    saveJobId(jobDetails) {
        this.appService.saveJobId(jobDetails).subscribe(res => {
            this.alertService.success('Successfully submitted ' + jobDetails.trackWord + ' For Analysis');
            console.log('JOB ID SAVED');
            this.getJobDetails();
            this.term = '';
        });
    }


}
