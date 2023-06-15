import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  user: AuthData | null = null;

  constructor(private authService: AuthService) { }
  sessionDuration: string | null = null;

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
      if (userString) {
        this.user = JSON.parse(userString);
      }
  }

}
