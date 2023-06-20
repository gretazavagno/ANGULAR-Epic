import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoading = false;

  constructor(private router: Router) { }
  isHovered: boolean = false;
  imagePath: string = 'assets/img/NCC logo.png';
  ngOnInit(): void {
  }

  vaiLogIn(form: NgForm) {


        this.router.navigate(['/login']);

  }
}



