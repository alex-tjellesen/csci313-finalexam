import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from './auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authStateService: AuthStateService,
    private router: Router
  ) {}
  
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.authStateService.isLoggedIn;
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirect to login page
      return false;
    }
    return true;
  }
  
}
