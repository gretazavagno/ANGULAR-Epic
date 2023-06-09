import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { switchMap, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private utenteLoggato: boolean = false;

  list(arg0: string) {
    throw new Error('Method not implemented.');
  }
  user$: any;

  constructor(private auth: AngularFireAuth, private firebase: AngularFireDatabase, private route: Router) { }

  isUtenteLoggato(): boolean {
    return this.utenteLoggato;
  }

  //REGISTRAZIONE DELL'UTENTE
  async register(email: string, password: string, nome: string, cognome: string, dataNascita: string, indirizzo: string, citta: string, zipCode: string, professione: string, nAlbo: string, number: string) {
    try {
      const user = await this.auth.createUserWithEmailAndPassword(email, password);
      if(user.user){
        await this.firebase.object(`users/${user.user.uid}`).set({nome: nome, cognome: cognome, dataNascita: dataNascita, email: email, indirizzo: indirizzo, citta: citta, zipCode: zipCode, professione: professione, nAlbo: nAlbo, number: number});
        console.log('avvenuta registrazione', user.user);
      }
    }
    catch (error) {
          console.error('Errore nella registrazione', error);
        }
  }

  //LOGIN DELL'UTENTE
  async login(email: string, password: string) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      this.utenteLoggato = true;
      console.log('Login effettuato');
    }
    catch (error){
      console.error('Errore nel login', error);
      throw error;
    }
  }

  //LOGOUT DELL'UTENTE
  async logout(email: string) {
    try {
      await this.auth.signOut();
      this.utenteLoggato = false;
      console.log('Logged out');
    }
    catch (error){
      console.error('Errore nella logout', error);
    }
  }

  //GET UTENTE E MI RESTITUISCE L'UTENTE COLLEGATO
  getUserData() {
    return this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firebase.object(`/users/${user.uid}`).valueChanges().pipe(
            switchMap(userData => {
              const userDataWithUid = Object.assign({}, userData, { uid: user.uid });
              return of(userDataWithUid);
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }

}



