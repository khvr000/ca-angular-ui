import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../_models/user';
import {RegisterUser} from '../_models/registerUser';


@Injectable()
export class RegisterService {
  constructor(private http: HttpClient) { }
  registerUrl = 'https://8nv3z5xrj7.execute-api.ap-south-1.amazonaws.com/stage01/ca/register';
  registerAnUser (registerModel: RegisterUser) {
    return this.http.post(this.registerUrl, registerModel);
  }
}
