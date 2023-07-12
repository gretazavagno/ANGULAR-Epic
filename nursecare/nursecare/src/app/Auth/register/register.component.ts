import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email = '';
  password = '';
  nome = '';
  cognome = '';
  dataNascita='';
  indirizzo = '';
  zipCode='';
  citta = '';
  professione = '';
  nAlbo = '';
  number = '';

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registra(){
    this.authSrv.register(this.email, this.password, this.nome, this.cognome,this.dataNascita, this.indirizzo, this.zipCode, this.citta, this.professione, this.nAlbo, this.number)
    .then(()=>{
      console.log('utente registrato com sucesso');
      this.router.navigate(['/login']); //Appena invio va su login
    })
    .catch(error => {
      console.error('Errore nella registrazione', error);
    })
  }

}
