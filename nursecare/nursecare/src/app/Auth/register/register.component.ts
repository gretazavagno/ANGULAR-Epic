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

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registra(){
    this.authSrv.register(this.email, this.password, this.nome, this.cognome)
    .then(()=>{
      console.log('utente registrato com sucesso');
      this.router.navigate(['/login']); //Appena invio va su login
    })
    .catch(error => {
      console.error('Errore nella registrazione', error);
    })
  }

}
