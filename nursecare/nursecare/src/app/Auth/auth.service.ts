import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: any;

  constructor(private auth: AngularFireAuth, private firebase: AngularFireDatabase) { }

  //REGISTRAZIONE DELL'UTENTE
  async register(email: string, password: string, nome: string, cognome: string) {
    try {
      const user = await this.auth.createUserWithEmailAndPassword(email, password);
      if(user.user){
        await this.firebase.object(`users/${user.user.uid}`).set({nome: nome, cognome: cognome, email: email});
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
      console.log('Logged in');
    }
    catch (error){
      console.error('Errore nella login', error);
    }
  }

  //LOGOUT DELL'UTENTE
  async logout(email: string) {
    try {
      await this.auth.signOut();
      console.log('Logged out');
    }
    catch (error){
      console.error('Errore nella logout', error);
    }
  }

  //GET UTENTE
  getUserData() {
    return this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firebase.object(`/users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }


}
