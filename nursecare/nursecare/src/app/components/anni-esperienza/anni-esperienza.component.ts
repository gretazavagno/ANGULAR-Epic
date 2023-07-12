import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Competenze } from 'src/app/models/competenze.interface';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anni-esperienza',
  templateUrl: './anni-esperienza.component.html',
  styleUrls: ['./anni-esperienza.component.scss']
})
export class AnniEsperienzaComponent implements OnInit {
  user: any;
  users: any = {};

  anni = {
    anni: '',
    key:'',
  };

  competenzeAggiunte = false;
  competenzaInModifica: any = null; // Rappresenta la competenza attualmente in fase di modifica
  constructor(private authSrv: AuthService, private firedatabase: AngularFireDatabase, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authSrv.getUserData().subscribe(data => {
      this.user = data;
      console.log(data);
      this.loadTitoli();
    });

  }

  loadTitoli(): void {
    this.firedatabase
      .list(`/users/${this.user?.uid}/anni`)
      .valueChanges()
      .subscribe((anni: any) => {
        this.users.anni = anni;
      });
  }

  submit(): void {
    if (!this.user) {
      console.error('Devi essere autenticato per aggiungere competenze');
      return;
    }

    const ref = this.firedatabase.list(`/users/${this.user.uid}/anni`).push(this.anni);

    ref.then((item) => {
      console.log('Competenze aggiunte con successo');
      console.log(this.user.uid);

      if (item.key !== null) {
        this.anni.key = item.key;

        this.firedatabase.object(`/users/${this.user.uid}/anni/${item.key}`).update(this.anni)
          .then(() => {
            console.log('Competenza aggiunta con successo', this.anni);
          })
          .catch((error) => {
            console.error('Errore durante l aggiunta delle competenze:', error);
          });
      }

      // this.anni = {
      //   anni: '',
      //   key: '',
      // };
    });
  }

  // METODO MODIFICA COMPETENZA

 modifica: string | null = null;

 modificaCompetenza(key: string, competenzaModificata: AnniEsperienzaComponent) {
  return this.firedatabase
    .object(`/users/${this.user.uid}/anni/${key}`)
    .update(competenzaModificata)
    .then(() => {
      console.log('competenza modificata con successo', competenzaModificata);
    })
    .catch((error) => {
      console.error('competenza non modificata con successo', error);
    });
}
}


