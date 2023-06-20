import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading = false;

  constructor(private router: Router) { }
  isHovered: boolean = false;
  imagePath: string = 'assets/img/NCC_logo.png';
  ngOnInit(): void {
  }

  vaiLogIn() {
        this.router.navigate(['/login']);
  }
  vaiRegister() {
    this.router.navigate(['/register']);
  }

}
