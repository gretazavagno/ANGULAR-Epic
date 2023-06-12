import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  registrati(form: NgForm) {
    this.isLoading = true;
    console.log(form.value);
    try {
        this.authService.signup(form.value).subscribe();
        this.router.navigate(['/login']);
        this.isLoading = false
    } catch (error: any) { // Cast error to any type
        console.error(error);
        if (error.status == 400) {
            alert('Email già registrata!');
            this.router.navigate(['/register']);
        }
        this.isLoading = false
    }
}
}
