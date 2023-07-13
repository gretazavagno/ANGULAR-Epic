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
  users: any[] = [];

  constructor(
    private authSrv: AuthService,
    private firedatabase: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {}

  cerca(): void {
    this.users = [];
    this.firedatabase
      .list('/users')
      .valueChanges()
      .subscribe((results: any[]) => {
        this.users = results.filter(user => {
          for (const key in user) {
            if (user.hasOwnProperty(key) && typeof user[key] === 'string' && user[key].includes(this.searchValue)) {
              console.log('Questo è lo zip code cercato', user[key]);
              return true;
            }
          }
          return false;
        });

        this.loadCompetenze();
        this.loadTitoli();
        this.loadAnniEsperienza();
      });

    this.authSrv.getUserData().subscribe(data => {
      this.user = data;
      console.log(data);
    });
  }

  loadCompetenze(): void {
    this.users.forEach((user: any, index: number) => {
      const competenze = user.competenze;

      const competenzeArray = [];
      for (const competenzaId in competenze) {
        if (competenze.hasOwnProperty(competenzaId)) {
          const competenza = competenze[competenzaId];
          competenza.key = competenzaId;
          competenzeArray.push(competenza);
        }
      }

      this.users[index].competenze = competenzeArray;
    });
  }

  loadTitoli():void{
    this.users.forEach((user: any, index: number) => {
      const titoli = user.titoli;

      const titoliArray = [];
      for (const titoloId in titoli) {
        if (titoli.hasOwnProperty(titoloId)) {
          const titolo = titoli[titoloId];
          titolo.key = titoloId;
          titoliArray.push(titolo);
        }
      }

      this.users[index].titoli = titoliArray;
    });
  }

  loadAnniEsperienza():void{
    this.users.forEach((user: any, index: number) => {
      const anni = user.anni;

      const anniArray = [];
      for (const annoId in anni) {
        if (anni.hasOwnProperty(annoId)) {
          const anno = anni[annoId];
          anno.key = annoId;
          anniArray.push(anno);
        }
      }

      this.users[index].anni = anniArray;
    });
  }

  contatti(userId: number): void {
    this.router.navigate(['/profilo-cercato', userId]);
  }


}
