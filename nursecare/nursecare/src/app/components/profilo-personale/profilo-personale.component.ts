import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/auth.service';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { Competenze } from 'src/app/models/competenze.interface';

@Component({
  selector: 'app-profilo-personale',
  templateUrl: './profilo-personale.component.html',
  styleUrls: ['./profilo-personale.component.scss']
})
export class ProfiloPersonaleComponent implements OnInit {
  user: any;
  competenze!: any[];
  modifica: string | null = null;

  constructor(private authSrv: AuthService, private firedatabase: AngularFireDatabase) { }

  competenza = {
    titolo: '',
    descrizione: '',
    key: '',
  }

  ngOnInit(): void {

    this.authSrv.getUserData().subscribe(data => {
      this.user = data;

    })

    this.firedatabase
      .list('competenze')
      .valueChanges()
      .subscribe((data) => {
        this.competenze = data;
      });
  }

  addCompetenza():void {
    const ref = this.firedatabase.list('competenze').push(this.competenza);
    ref.then((item) => {
      if(item.key!==null){
        //Aggiungi la chiave all'oggetto
        this.competenza.key = item.key;
        //Aggiorna l'oggetto nel db con la nuova chiave
        item.update(this.competenza).then(()=>{
          console.log('competenza aggiunta con successo', this.competenza);
          this.resetForm();
        })
      }
    })
    .catch((error) => {
      console.log('competenza non aggiunta', error);
    })
  }

  //RESETTARE FORM DOPO INVIO
  resetForm(): void {
    this.competenza = {
      titolo: '',
      descrizione: '',
      key: '',
    }
  }

  // METODO MODIFICA ESPERIENZA
  modificaCompetenza(key: string, competenzaModificata: Competenze) {
    return this.firedatabase
      .object(`competenze/${key}`)
      .update(competenzaModificata)
      .then(() => {
        console.log('competenza modificata con successo', competenzaModificata);
      })
      .catch((error) => {
        console.error('competenza non modificata con successo', error);
      });
  }

  //ELIMINARE COMPETENZA
  eliminaCompetenza(key: string) {
    return this.firedatabase.object(`competenze/${key}`).remove();
  }

}









