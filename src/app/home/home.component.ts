import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import {AppService} from '../app.service';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  title = 'ci-angular-ui';
  term;
  newterm;
  responseJobId: string;

  constructor (private appService: AppService,
               private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  setSearchKeyWord(keyword: string) {
    this.appService.setSearchKeyWord(keyword).subscribe(res => {
      this.responseJobId = res['body'];
    });
  }


  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers()
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }
}
