import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from 'src/app/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchValue!: string;
  users: any[] = [];

  constructor(private router: Router, private firedatabase: AngularFireDatabase, private authSrv: AuthService) { }

  ngOnInit(): void {
    // this.authSrv.getUserData().subscribe(data => {
    //   this.user = data;
    //   console.log(data);
    // });
  }

  cerca(): void {
    this.users = [];

    this.firedatabase
      .list('/users')
      .valueChanges()
      .subscribe((results: any[]) => {
        this.users = results.filter(user => {
          // Confronta il valore di ricerca con i campi degli utenti
          for (const key in user) {
            if (user.hasOwnProperty(key) && typeof user[key] === 'string' && user[key].includes(this.searchValue)) {
              console.log('Questo è lo zip code cercato',user[key]);
              return true;

            }
          }
          return false;
        });
      });
  }

  visualizzaDettagli(userId: string): void {
    this.router.navigate(['/profilo-cercato', userId]);
  }


}

