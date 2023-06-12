import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'; //Libreria per lettura del token
import { tap, catchError } from 'rxjs/operators'; //operatore
import { AuthData } from './auth-data';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'; //reindirizza a altr apgina dopo logout

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService(); // Legge e valida il token
  baseURL = environment.baseURL;
  private authSubj = new BehaviorSubject<null | AuthData>(null); // Comunica in tempo reale la presenza dell'utente autenticato
  utente!: AuthData;

  user$ = this.authSubj.asObservable(); // La variabile di tipo BehaviourSubject che trasmetterà la presenza o meno dell'utente
  timeoutLogout: any;
  constructor(private http: HttpClient, private router: Router) { }

  login(data: { email: string, password: string }) {
    return this.http.post<AuthData>(`${this.baseURL}/auth/login`, data).pipe(
      tap((data) => {
        console.log(data);
        this.authSubj.next(data); // Il BehaviourSubject riceve i dati del login per poi passarli alla proprietà user$
        this.utente = data;
        console.log(this.utente);
        localStorage.setItem('user', JSON.stringify(data)); // Il localStorage memorizza l'oggetto utente completo di token
        this.autoLogout(data);
    }),
    catchError(this.errors)
    )
  }

  logout() {
    this.authSubj.next(null); // Svuota il BehaviourSubject risportandolo a nulla, e quindi la proprietà user$ ritorna null
    localStorage.removeItem('user');
    this.router.navigate(['/']); // Reindirizzamento alla home a seguito del logout
    if (this.timeoutLogout) {
        // Se non è passato il tempo della scadenza del token (vedi riga 67 setTimeout) in caso di abbandono dell'applicazione senza aver effettuato il logout, il metodo cancella il setTimeout per far ripartire il counter
        clearTimeout(this.timeoutLogout);
    }
}

  autoLogout(data: AuthData) {
    const expirationDate = this.jwtHelper.getTokenExpirationDate(
        data.accessToken
    ) as Date;
    const expirationMilliseconds =
        expirationDate.getTime() - new Date().getTime();
    this.timeoutLogout = setTimeout(() => {
        this.logout();
    }, expirationMilliseconds);
}

restore() {
  // Utilizzato nel caso l'applicazione venga abbandonata senza effettuare il logout e poi venga riaperta con il token ancora valido
  const user = localStorage.getItem('user');
  if (!user) {
      return;
  }
  const userData: AuthData = JSON.parse(user);
  if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
      // Consente di leggere il token, nello specifico data e ora di scadenza
      return;
  }
  this.authSubj.next(userData); // Rientrando nell'applicazione, il BehaviourSubject è di nuovo null (vedi riga 16), di conseguenza riceve i valori presenti nel localStorage, letti dalla variabile user e parsati nella variabile useData
  this.autoLogout(userData);
}

signup(data: {
  nome: string;
  cognome: string;
  email: string;
  password: string;
}) {
  return this.http.post(`${this.baseURL}register`, data);
}

private errors(err: any) {
  switch (err.error) {
      case 'Email already exists':
          return throwError('Utente già presente');
          break;

      case 'Email format is invalid':
          return throwError('Formato mail non valido');
          break;

      default:
          return throwError('Errore nella chiamata');
          break;
  }
}



}
