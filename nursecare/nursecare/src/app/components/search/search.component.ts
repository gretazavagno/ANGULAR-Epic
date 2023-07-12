import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from 'src/app/Auth/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchValue!: string;
  user: any;
  users: any = {};
  competenze = {
    titolo: '',
    descrizione: '',
    key: '',
  };
  constructor(private authSrv: AuthService, private firedatabase: AngularFireDatabase, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.authSrv.getUserData().subscribe(data => {
    //   this.user = data;
    //   console.log(data);
    //   this.loadCompetenze();
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

      this.authSrv.getUserData().subscribe(data => {
        this.user = data;
        console.log(data);
        this.loadCompetenze();
      });

  }

  loadCompetenze(): void {
    this.firedatabase
      .list(`/users/${this.user?.uid}/competenze`)
      .valueChanges()
      .subscribe((competenze: any) => {
        this.users.competenze = competenze;
      });
  }

  contatti(userId: number): void {
    this.router.navigate(['/profilo-cercato', userId]);
  }

  // hasCompetenze(user: any): boolean {
  //   return (
  //     user.hasOwnProperty('competenze') &&
  //     Array.isArray(user.competenze) &&
  //     user.competenze.length > 0
  //   );
  // }
}

