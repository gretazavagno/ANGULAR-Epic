import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Competenze } from 'src/app/models/competenze.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dettagli-profilo',
  templateUrl: './dettagli-profilo.component.html',
  styleUrls: ['./dettagli-profilo.component.scss']
})
export class DettagliProfiloComponent implements OnInit {
  user: any;
  users: any = {};
  competenze: any[] = [];
  titoli: any[] = [];

  constructor(private authSrv: AuthService, private firedatabase: AngularFireDatabase, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authSrv.getUserData().subscribe(data => {
      this.user = data;
      console.log(data);
      this.loadCompetenze();
      this.loadTitoli();
    });

  }
  loadCompetenze(): void {
    this.firedatabase
      .list(`/users/${this.user?.uid}/competenze`)
      .valueChanges()
      .subscribe((competenze: any) => {
        this.competenze = competenze;
      });
  }

  loadTitoli(): void{
    this.firedatabase
    .list(`/users/${this.user?.uid}/titoli`)
    .valueChanges()
    .subscribe((titoli: any) => {
      this.titoli = titoli;
    });
  }

  vaiAggiungiSkills(){
    this.router.navigate(['/profilo-personale'], { queryParams: { competenzeAggiunte: 'true' } });
  }

  // METODO MODIFICA

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

 //AGGIUNGI MASTER
 aggiungiMaster(){
  this.router.navigate(['/aggiungi-titoli'], { queryParams: { competenzeAggiunte: 'true' } });
}

}


