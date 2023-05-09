import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthStateService } from './auth-state.service';

import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
 
  constructor(
    private db: AngularFireDatabase, 
    private authStateService: AuthStateService,
    private router: Router){ }

  async createUser(email: string, password: string, name: string): Promise<void> {
    const id = this.db.createPushId(); // generate a unique ID for the new user
    const user: User = { id, email, password, name };
    await this.db.object(`users/${id}`).set(user);
    this.login(email, password);
  }


  async login(email: string, password: string): Promise<void> {
    this.db.list('users', ref => ref.orderByChild('email').equalTo(email))
    .valueChanges()
    .subscribe((users: any[]) => {
      if (users.length > 0 && users[0].password === password) {
        this.authStateService.setLoggedIn(true);
        this.authStateService.setUser(users[0])
        this.router.navigate(['/products']);
      } else{
        this.authStateService.setLoggedIn(false);
        this.authStateService.setUser(null);
      }
    })
  }

  logout() {
    this.authStateService.setLoggedIn(false);
    this.authStateService.setUser(null);
  }
}
