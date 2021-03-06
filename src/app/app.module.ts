import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
/*import {MatTableModule} from '@angular/material/table';*/


// used to create fake backend

import { AppComponent } from './app.component';
import {AppRouting} from './app.routing';

import { AlertComponent } from './_directives/alert.component';
import { AuthGuard } from './_guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {UserService} from './_services/user.service';
import {AlertService} from './_services/alert.service';
import {AuthenticationService} from './_services/authentication.service';
import {ErrorInterceptor, fakeBackendProvider, JwtInterceptor} from './_helpers';
import {RegisterService} from './_services/register.service';
import {LoginService} from './_services/login.service';
import {SharedProperties} from './_services/sharedProperties';
import { ResultComponent } from './result/result.component';
import { SearchComponent } from './search/search.component';
import {AmChartsModule} from '@amcharts/amcharts3-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule, MatTableModule} from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRouting,
    AmChartsModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ResultComponent,
    SearchComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    RegisterService,
    LoginService,
    SharedProperties,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
