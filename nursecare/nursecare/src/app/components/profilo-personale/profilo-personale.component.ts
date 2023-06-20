import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/auth.service';
import { AngularFireDatabase} from '@angular/fire/compat/database';

@Component({
  selector: 'app-profilo-personale',
  templateUrl: './profilo-personale.component.html',
  styleUrls: ['./profilo-personale.component.scss']
})
export class ProfiloPersonaleComponent implements OnInit {

  user: any;
  users: any;

  competenze  = {
    titolo: '',
    descrizione: '',
    key: '',
  };


  constructor(private authSrv: AuthService, private firedatabase: AngularFireDatabase) { }

  // competenza = {
  //   titolo: '',
  //   descrizione: '',
  //   key: '',
  // }

  ngOnInit(): void {

    this.authSrv.getUserData().subscribe(data => {
      this.user = data;
      console.log(data)
    })
  }

  //AGGIUNGERE LE COMPETENZE COLLEGATE ALL'UTENTE

  submit(): void {
    // Verifica che l'utente sia autenticato
    if (!this.user) {
      console.error('Devi essere autenticato per aggiungere competenze');
      return;
    }

    // Aggiungi l'oggetto competenze all'utente
    const ref = this.firedatabase.list(`/users/${this.user.uid}/competenze`).push(this.competenze);

    this.firedatabase.object(`/users/${this.user.uid}/competenze`).update(ref) //this.competenze al posto di ref

    ref.then((item) => {
      console.log('Competenze aggiunte con successo');
      console.log(this.user.uid)

      if(item.key!==null){
        //Aggiungi la chiave all'oggetto
        this.competenze.key = item.key;
        //Aggiorna l'oggetto nel db con la nuova chiave
        item.update(this.users.competenze).then(()=>{
          console.log('competenza aggiunta con successo', this.competenze);
        })
      }

      // Resetta le competenze
      this.competenze = {
        titolo: '',
        descrizione: '',
        key: '',
      };
    })

      .catch((error) => {
        console.error('Errore durante l aggiunta delle competenze:', error);
      });
    }



}









