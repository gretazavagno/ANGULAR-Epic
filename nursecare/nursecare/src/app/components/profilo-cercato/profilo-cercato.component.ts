import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-profilo-cercato',
  templateUrl: './profilo-cercato.component.html',
  styleUrls: ['./profilo-cercato.component.scss']
})
export class ProfiloCercatoComponent implements OnInit {
  user: any;

  constructor(private activatedRoute: ActivatedRoute, private firedatabase: AngularFireDatabase, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const userId = params['userId'];

      this.firedatabase
        .object(`/users/${userId}`)
        .valueChanges()
        .subscribe(user => {
          this.user = user;
        });
    });
  }
  tornaIndietro(): void {
    this.router.navigate(['/search']);
  }

}
