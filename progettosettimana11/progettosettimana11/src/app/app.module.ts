import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //importazione form
import { Route, RouterModule } from '@angular/router'; //importazione rotte
import { HttpClientModule } from '@angular/common/http'; //importazione http
import { AuthGuard } from './auth/auth.guard'; //importazione authGuard

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ProfilesComponent } from './components/profiles/profiles.component';


const routes: Route[] = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
      path: 'login',
      component: LoginComponent
  },
  {
      path: 'register',
      component: RegisterComponent
  },
  {
    path:'movies',
    component: MoviesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profiles',
    component: ProfilesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'navbar',
    component: NavbarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profilo',
    component: ProfilesComponent,
    canActivate: [AuthGuard]
  },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    MoviesComponent,
    ProfilesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
