import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './Auth/auth.guard';

import { AppComponent } from './app.component';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';
import { environment } from 'src/environments/environment';
import { ProfiloPersonaleComponent } from './components/profilo-personale/profilo-personale.component';
import { HomeComponent } from './components/home/home.component';
import { DettagliProfiloComponent } from './components/dettagli-profilo/dettagli-profilo.component';
import { SearchComponent } from './components/search/search.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AssistenzaAnzianiComponent } from './components/assistenza-anziani/assistenza-anziani.component';
import { PrelieviComponent } from './components/prelievi/prelievi.component';
import { TelemedicinaComponent } from './components/telemedicina/telemedicina.component';
import { MedicazioniComponent } from './components/medicazioni/medicazioni.component';
import { CateteriStomieComponent } from './components/cateteri-stomie/cateteri-stomie.component';
import { ChisiamoComponent } from './components/chisiamo/chisiamo.component';
import { CertificazioniComponent } from './components/certificazioni/certificazioni.component';
import { CovidComponent } from './components/covid/covid.component';
import { BpcoComponent } from './components/bpco/bpco.component';
import { DiabeteComponent } from './components/diabete/diabete.component';
import { CardiopatieComponent } from './components/cardiopatie/cardiopatie.component';
import { IpertensioneComponent } from './components/ipertensione/ipertensione.component';
import { MalattieRenaliComponent } from './components/malattie-renali/malattie-renali.component';
import { MalattieTumoraliComponent } from './components/malattie-tumorali/malattie-tumorali.component';
import { FooterComponent } from './components/footer/footer.component';
import { TitoliStudioComponent } from './components/titoli-studio/titoli-studio.component';
import { AnniEsperienzaComponent } from './components/anni-esperienza/anni-esperienza.component';


const routes: Route[] = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
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
    canActivate: [AuthGuard]
  },
  {
    path: 'dettagli-profilo',
    component: DettagliProfiloComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'assistenza-anziani',
    component: AssistenzaAnzianiComponent
  },
  {
    path: 'prelievi',
    component: PrelieviComponent
  },
  {
    path:'telemedicina',
    component: TelemedicinaComponent
  },
  {
    path:'medicazioni',
    component: MedicazioniComponent,
  },
  {
    path: 'cateteri-stomie',
    component: CateteriStomieComponent
  },
  {
    path:'chi-siamo',
    component: ChisiamoComponent
  },
  {
    path:'certificazioni',
    component: CertificazioniComponent
  },
  {
    path: 'covid',
    component: CovidComponent
  },
  {
    path: 'bpco',
    component: BpcoComponent
  },
  {
    path: 'diabete',
    component: DiabeteComponent
  },
  {
    path: 'ipertensione',
    component: IpertensioneComponent
  },
  {
    path: 'cardiopatie',
    component: CardiopatieComponent
  },
  {
    path:'malattie-renali',
    component: MalattieRenaliComponent
  },
  {
    path: 'malattie-tumorali',
    component: MalattieTumoraliComponent
  },
  {
    path: 'aggiungi-titoli',
    component: TitoliStudioComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'anni-esperienza',
    component: AnniEsperienzaComponent,
    canActivate: [AuthGuard]

  }
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfiloPersonaleComponent,
    HomeComponent,
    DettagliProfiloComponent,
    SearchComponent,
    NavbarComponent,
    AssistenzaAnzianiComponent,
    PrelieviComponent,
    TelemedicinaComponent,
    MedicazioniComponent,
    CateteriStomieComponent,
    ChisiamoComponent,
    CertificazioniComponent,
    CovidComponent,
    BpcoComponent,
    DiabeteComponent,
    CardiopatieComponent,
    IpertensioneComponent,
    MalattieRenaliComponent,
    MalattieTumoraliComponent,
    FooterComponent,
    TitoliStudioComponent,
    AnniEsperienzaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
