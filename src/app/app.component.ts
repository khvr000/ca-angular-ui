import { Component } from '@angular/core';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ci-angular-ui';
  term;
  newterm;
  responseJobId: string;

  constructor (private appService: AppService) {}

  setSearchKeyWord(keyword: string) {
    this.appService.setSearchKeyWord(keyword).subscribe(res => {
      this.responseJobId = res['body'];
    });
  }

    testPostCall(keyword: string) {
        console.log('pst Call called ');
        this.appService.testPostMethod(keyword).subscribe(res => {
          console.log('Success00000');
        });

    }



}
