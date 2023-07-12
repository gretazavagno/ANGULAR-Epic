import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(private authSvr: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  accedi(): void{
      this.authSvr.login(this.email, this.password)
      .then(()=>{
        console.log("Login success");
        this.router.navigate(['/dettagli-profilo']); //dove voglio andare appena accedo
      })
      .catch(()=>{
        alert('Ops, non sei registrato');
        this.router.navigate(['/register']);
      })
  }

}
