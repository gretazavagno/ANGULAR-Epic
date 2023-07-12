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
        this.competenze = competenze;
      });
  }

  vaiAggiungiSkills(){
    this.router.navigate(['/profilo-personale'], { queryParams: { competenzeAggiunte: 'true' } });
  }



}


