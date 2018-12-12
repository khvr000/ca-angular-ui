import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import {HomeComponent} from './home/home.component';
import {ResultComponent} from './result/result.component';
import {SearchComponent} from './search/search.component';
import {NgModule} from "@angular/core";

// const appRoutes: Routes = [
//   // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
//   { path: '', component: SearchComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'results', component: ResultComponent },
//   { path: 'search', component: SearchComponent },
//   // otherwise redirect to home
//   { path: '**', redirectTo: '' }
// ];


const appRoutes: Routes = [

    { path: '', component: LoginComponent},
    { path: 'login',component: LoginComponent},
    { path: 'register',component: RegisterComponent},
    { path: 'home',
      component: HomeComponent,
      // canActivate: [AuthGuard],
      children: [
            { path: '', component: SearchComponent},
            { path: 'results/:id', component: ResultComponent },
            { path: 'search', component: SearchComponent },
            { path: '**', component: SearchComponent, pathMatch: 'full'}
      ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes, {useHash: true})
    ],
    exports: [
        RouterModule
    ]
})


export  class AppRouting {

}

// export const routing = RouterModule.forRoot(appRoutes);
