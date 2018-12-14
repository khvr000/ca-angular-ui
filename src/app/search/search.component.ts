import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../_models/user';
import {AppService} from '../app.service';
import {UserService} from '../_services/user.service';
import {SharedProperties} from '../_services/sharedProperties';
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {AlertService} from "../_services/alert.service";
/*export interface PeriodicElement {
    name: string;
    weight: number;
    symbol: string;
}*/

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
// let ELEMENT_DATA = [];
/*
 {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
 {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
 {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
 {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
 {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
 {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
 {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
 {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
 {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
 {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
 {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
 {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
 {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
 {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
 {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
 {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
 {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
 {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
 {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
 {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
*/
/*const ELEMENT_DATA: PeriodicElement[] = [
    {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'H'},
    {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'He'},
    {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'Li'},
    {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'Be'},
    {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'B'},
    {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'C'},
    {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'N'},
    {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'B'},
    {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'C'},
    {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'N'},
    {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'B'},
    {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'C'},
    {trackWord: 'Car', time: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'N'}
];*/

let ELEMENT_DATA: PeriodicElement[] = [
/*    { name: 'Hydreeeogen', weight: 1.0079, symbol: 'H'},
    { name: 'Helium', weight: 4.0026, symbol: 'He'},
    { name: 'Lithium', weight: 6.941, symbol: 'Li'},
    { name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    { name: 'Boron', weight: 10.811, symbol: 'B'},
    {name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    { name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    { name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {name: 'Sodium', weight: 22.9897, symbol: 'Na'},
    { name: 'Magnesium', weight: 24.305, symbol: 'Mg'}*/
];

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    displayedColumns: string[] = ['trackWord', 'time', 'View'];
    dataSource: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;

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
        // this.dataSource.paginator = this.paginator;
        this.loading = true;
        this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
        // this.dataSource =  new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
       // this.dataSource.paginator = this.paginator;
        this.getJobDetails();

    }
    getJobDetails() {
        this.appService.getJobIds(this.userDetails).subscribe(res => {

            this.loading = false;
            console.log('response', typeof res);
           const peopleArray = Object.keys(res).map(i => res[i]);
           console.log( peopleArray);
           ELEMENT_DATA = peopleArray;
           console.log('Elements Data', ELEMENT_DATA);

           this.dataSource =  new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
           // this.dataSource = ELEMENT_DATA;
           this.dataSource.paginator = this.paginator;

        });
    }
    setSearchtrackWord(trackWord: string) {
        if (trackWord.length > 0) {
            this.loading = false;
            this.appService.setSearchtrackWord(trackWord).subscribe(res => {
                this.responseJobId = res;
                this.loading = true;
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

    }
    getTimeInFormat(time){
        return Date.parse(time);
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
