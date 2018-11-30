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
  responseJobId: string;

  constructor (private appService: AppService) {}

  setSearchKeyWord(keyword: string) {
    this.appService.setSearchKeyWord(keyword).subscribe(res => {
      this.responseJobId = res['body'];
    });
  }
}
