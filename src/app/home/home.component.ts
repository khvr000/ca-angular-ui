import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import {AppService} from '../app.service';
import {SharedProperties} from '../_services/sharedProperties';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  title = 'ci-angular-ui';
  term;
  userDetails: any;
  newterm;
  responseJobId: string;

  constructor (private appService: AppService,
               private userService: UserService,
               private sharedPropertied: SharedProperties) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  setSearchKeyWord(keyword: string) {
    this.appService.setSearchKeyWord(keyword).subscribe(res => {
      this.responseJobId = res['body'];
    });
  }


  ngOnInit() {
    this.userDetails = this.sharedPropertied.getUserDetails();
  }

}
