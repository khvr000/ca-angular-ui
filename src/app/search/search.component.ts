import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {AppService} from '../app.service';
import {UserService} from '../_services/user.service';
import {SharedProperties} from '../_services/sharedProperties';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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

    setSearchKeyWord(keyword: string) {
        this.appService.setSearchKeyWord(keyword).subscribe(res => {
            this.responseJobId = res['body'];
        });
    }


    ngOnInit() {
        this.userDetails = this.sharedPropertied.getUserDetails();
    }
}
