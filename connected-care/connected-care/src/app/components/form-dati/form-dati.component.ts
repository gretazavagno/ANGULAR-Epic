import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Component({
  selector: 'app-form-dati',
  templateUrl: './form-dati.component.html',
  styleUrls: ['./form-dati.component.scss']
})
export class FormDatiComponent implements OnInit {


  constructor(private firedatabase: AngularFireDatabase) { }


  competenza = {
    titolo: '',
    descrizione: '',
    key: '',
  }

  competenze!: any[];

  ngOnInit(): void {
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
      console.log('competenza aggiunta con successo', this.competenza);
      if(item.key !== null){
        this.competenza.key = item.key;

        item.update(this.competenza).then(() => {
          console.log('esperienza aggiunta con successo', this.competenza);
          this.resetForm();
        });
      }
    })

    .catch((error) => {
      console.log('competenza non aggiunta', error);
    })
  }

  resetForm(): void {
    this.competenza = {
      titolo: '',
      descrizione: '',
      key: '',
    }
  }


}





