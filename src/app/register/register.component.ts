

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {UserService} from '../_services/user.service';
import {AlertService} from '../_services/alert.service';
import {RegisterService} from '../_services/register.service';
import {RegisterUser} from '../_models/registerUser';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private registerService: RegisterService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    const registerModel = {
      'first_name': this.registerForm.value.firstName,
      'username': this.registerForm.value.username,
      'last_name': this.registerForm.value.lastName,
      'password': this.registerForm.value.password
    }
    this.registerService.registerAnUser(registerModel).subscribe(res => {
      console.log(res);
      if (res === 'REGISTERED') {
              this.alertService.success('Registration successful', true);
              this.router.navigate(['/login']);
      } else if (res['errorMessage'] === 'The conditional request failed') {
        this.loading = false;
        this.alertService.error('User Already Exits');
      }
    }, error => {
      this.alertService.error(error);
    });
  }
}

