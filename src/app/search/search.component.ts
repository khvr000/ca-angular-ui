import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../_models/user';
import {AppService} from '../app.service';
import {UserService} from '../_services/user.service';
import {SharedProperties} from '../_services/sharedProperties';
import {MatPaginator, MatTableDataSource} from "@angular/material";

export interface PeriodicElement {
    RequestTime: string;
    Keyword: string;
    View: string;
    jobId: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {Keyword: 'Car', RequestTime: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'H'},
    {Keyword: 'Car', RequestTime: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'He'},
    {Keyword: 'Car', RequestTime: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'Li'},
    {Keyword: 'Car', RequestTime: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'Be'},
    {Keyword: 'Car', RequestTime: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'B'},
    {Keyword: 'Car', RequestTime: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'C'},
    {Keyword: 'Car', RequestTime: 'Dec 12 2018 15:21:50', View: 'Show', jobId: 'N'}
];

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    displayedColumns: string[] = ['Keyword', 'RequestTime', 'View'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    @ViewChild(MatPaginator) paginator: MatPaginator;

    currentUser: User;
    users: User[] = [];


    title = 'ci-angular-ui';
    term;
    userDetails: any;
    newterm;
    responseJobId: string;

    constructor (private appService: AppService,
                 private userService: UserService,
                 private sharedPropertied: SharedProperties) {}

    ngOnInit() {
        this.userDetails = this.sharedPropertied.getUserDetails();
        this.dataSource.paginator = this.paginator;
    }

    setSearchKeyWord(keyword: string) {
        this.appService.setSearchKeyWord(keyword).subscribe(res => {
            this.responseJobId = res['body'];
        });
    }
    viewResult(element) {
        console.log(element);
    }



}
