import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';
import { environment } from 'src/environments/environment';
import { ProfiloPersonaleComponent } from './components/profilo-personale/profilo-personale.component';
import { HomeComponent } from './components/home/home.component';
import { DettagliProfiloComponent } from './components/dettagli-profilo/dettagli-profilo.component';

const routes: Route[] = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
//   {
//       path: 'profile',
//       component: ProfileComponent,
//       canActivate: [AuthGuard]
//   },
//   {
//       path: 'film',
//       component: MoviesComponent,
//       canActivate: [AuthGuard]
//   },
//   {
//     path: 'infoFIlm/:id',
//     component: InfoFilmComponent,
//     canActivate: [AuthGuard]
// },
  {
      path: 'login',
      component: LoginComponent
  },
  {
      path: 'register',
      component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profilo-personale',
    component: ProfiloPersonaleComponent,
  },
  {
    path: 'dettagli-profilo',
    component: DettagliProfiloComponent,
  }
  // {
  //   path: 'navbar',
  //   component: NavBarComponent,
    // canActivate: [AuthGuard]
// },
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfiloPersonaleComponent,
    HomeComponent,
    DettagliProfiloComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
