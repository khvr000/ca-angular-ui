import { Component } from '@angular/core';
import {AppService} from './app.service';
// import {FORM_PROVIDERS, FORM_DIRECTIVES} from 'angular2/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [FORM_PROVIDERS],
  // directives: [FORM_DIRECTIVES]
})
export class AppComponent {
  title = 'ci-angular-ui';
  term;
  newterm;
  responseJobId: string;

  constructor (private appService: AppService) {}

  /*setSearchtrackWord(keyword: string) {
    this.appService.setSearchKeyWord(keyword).subscribe(res => {
      this.responseJobId = res['body'];
    });
  }*/




}
