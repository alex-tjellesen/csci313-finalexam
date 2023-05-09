import { Component, OnInit } from '@angular/core';
import { User } from '../../auth/user';
import { AuthStateService } from '../../auth/auth-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user : User | null = null;

  constructor(private authStateService: AuthStateService){}

  ngOnInit(): void {
    this.authStateService.user$.subscribe((newUser) => {
      this.user = newUser;
    });
  }
}
