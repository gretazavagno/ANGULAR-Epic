import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Competenze } from 'src/app/models/competenze.interface';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profilo-personale',
  templateUrl: './profilo-personale.component.html',
  styleUrls: ['./profilo-personale.component.scss']
})
export class ProfiloPersonaleComponent implements OnInit {

  user: any;
  users: any = {};

  competenze = {
    titolo: '',
    descrizione: '',
    key: '',
  };
  competenzeAggiunte = false;
  competenzaInModifica: any = null; // Rappresenta la competenza attualmente in fase di modifica

  constructor(private authSrv: AuthService, private firedatabase: AngularFireDatabase, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
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

  submit(): void {
    if (!this.user) {
      console.error('Devi essere autenticato per aggiungere competenze');
      return;
    }

    const ref = this.firedatabase.list(`/users/${this.user.uid}/competenze`).push(this.competenze);

    ref.then((item) => {
      console.log('Competenze aggiunte con successo');
      console.log(this.user.uid);

      if (item.key !== null) {
        this.competenze.key = item.key;

        this.firedatabase.object(`/users/${this.user.uid}/competenze/${item.key}`).update(this.competenze)
          .then(() => {
            console.log('Competenza aggiunta con successo', this.competenze);
          })
          .catch((error) => {
            console.error('Errore durante l aggiunta delle competenze:', error);
          });
      }

      this.competenze = {
        titolo: '',
        descrizione: '',
        key: '',
      };
    });
  }


 // METODO MODIFICA COMPETENZA

 modifica: string | null = null;

 modificaCompetenza(key: string, competenzaModificata: Competenze) {
  return this.firedatabase
    .object(`/users/${this.user.uid}/competenze/${key}`)
    .update(competenzaModificata)
    .then(() => {
      console.log('competenza modificata con successo', competenzaModificata);
    })
    .catch((error) => {
      console.error('competenza non modificata con successo', error);
    });
}

// METODO ELIMINA COMPETENZA
  eliminaCompetenza(key: string): void {
    this.firedatabase.object(`/users/${this.user.uid}/competenze/${key}`).remove()
      .then(() => {
        console.log('Competenza eliminata con successo');
      })
      .catch((error) => {
        console.error('Errore durante l eliminazione della competenza:', error);
      });
  }


  //INVIARE LE COMPETENZE AGGIUNTE AL COMPONENTE DETTAGLI
  visualizzaDettagliCompetenze(): void {
    this.router.navigate(['/dettagli-profilo'], { queryParams: { competenze: JSON.stringify(this.users.competenze) } });
  }
}
