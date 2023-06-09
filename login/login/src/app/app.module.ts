import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { NuovoProdottoComponent } from './components/nuovo-prodotto/nuovo-prodotto.component';

const rotte: Route[] = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'prodotti',
        component: ProdottiComponent,
        canActivate: [AuthGuard]
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
        path: 'nuovoProdotto',
        component: NuovoProdottoComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProdottiComponent,
        NavbarComponent,
        LoginComponent,
        RegisterComponent,
        NuovoProdottoComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(rotte)
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
