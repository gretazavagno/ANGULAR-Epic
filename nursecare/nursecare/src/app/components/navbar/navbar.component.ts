import { Component, OnInit } from '@angular/core';
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
  imagePath: string = 'assets/img/NCC_logo.png';
  ngOnInit(): void {
  }

  vaiLogIn() {
        this.router.navigate(['/login']);
  }
  vaiRegister() {
    this.router.navigate(['/register']);
  }

  VaiSearch(){
    this.router.navigate(['/search']);
  }

}
