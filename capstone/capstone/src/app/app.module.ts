import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';

const routes: Route[] = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  {
      // path: 'profile',
      // component: ProfileComponent, PROFILO DEL PROFESSIONISTA
      // canActivate: [AuthGuard]
  },
  {
      // path: 'film',
      // component: MoviesComponent, AREA PERSONALE
      // canActivate: [AuthGuard]
  },
  {
    // path: 'infoFIlm/:id',
    // component: InfoFilmComponent,  INFO PROFESSIONISTA
    // canActivate: [AuthGuard]
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
    path: 'navbar',
    component: NavbarComponent,
    // canActivate: [AuthGuard]
},
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }








