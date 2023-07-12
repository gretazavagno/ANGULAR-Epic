import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Competenze } from 'src/app/models/competenze.interface';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-titoli-studio',
  templateUrl: './titoli-studio.component.html',
  styleUrls: ['./titoli-studio.component.scss']
})
export class TitoliStudioComponent implements OnInit {

  user: any;
  users: any = {};

  titoli = {
    titolo: '',
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
      .list(`/users/${this.user?.uid}/titoli`)
      .valueChanges()
      .subscribe((titoli: any) => {
        this.users.titoli = titoli;
      });
  }

  submit(): void {
    if (!this.user) {
      console.error('Devi essere autenticato per aggiungere competenze');
      return;
    }

    const ref = this.firedatabase.list(`/users/${this.user.uid}/titoli`).push(this.titoli);

    ref.then((item) => {
      console.log('Competenze aggiunte con successo');
      console.log(this.user.uid);

      if (item.key !== null) {
        this.titoli.key = item.key;

        this.firedatabase.object(`/users/${this.user.uid}/titoli/${item.key}`).update(this.titoli)
          .then(() => {
            console.log('Competenza aggiunta con successo', this.titoli);
          })
          .catch((error) => {
            console.error('Errore durante l aggiunta delle competenze:', error);
          });
      }

      this.titoli = {
        titolo: '',
        key: '',
      };
    });
  }


  //INVIARE LE COMPETENZE AGGIUNTE AL COMPONENTE DETTAGLI
  visualizzaDettagliCompetenze(): void {
    this.router.navigate(['/dettagli-profilo'], { queryParams: { titoli: JSON.stringify(this.users.titoli) } });
  }

}
