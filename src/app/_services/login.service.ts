import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../_models/user';
import {RegisterUser} from '../_models/registerUser';
import {LoginModel} from '../_models/loginModel';


@Injectable()
export class LoginService {
  isLoggedIn = false;
  constructor(private http: HttpClient) { }
  loginUrl = 'https://8nv3z5xrj7.execute-api.ap-south-1.amazonaws.com/stage01/ca/login';
  loginCheck (loginModel: LoginModel) {
    return this.http.post(this.loginUrl, loginModel);
  }
}
