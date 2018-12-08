import { Injectable } from '@angular/core';

@Injectable()
export class SharedProperties {
  userDetails: any;
  getUserDetails () {
    return this.userDetails;
  }
  setUserDetails (details) {
    this.userDetails = details;
  }
}
