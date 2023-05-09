import { Injectable } from '@angular/core';
import { User } from './user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService{
  isLoggedIn = false;
  private user = new BehaviorSubject<User | null>(null);  
  user$ = this.user.asObservable();

  constructor() {
    this.loadUser();
  }

  private loadUser(): void {
    const storedUserString = sessionStorage.getItem('user');
    var storedUser = null;
    if(!(storedUserString == null || typeof storedUserString === "undefined")){
      const parsedUser = JSON.parse(storedUserString);
      storedUser = {
        id: parsedUser.id,
        name: parsedUser.name,
        email: parsedUser.email,
        password: parsedUser.password,
      } as User;
      this.isLoggedIn = true;
    }
    this.user.next(storedUser);
  }

  setLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
  }

  setUser(newUser: User | null): void{
    this.user.next(newUser);
    if(newUser == null){
      sessionStorage.removeItem('user');
    }else{
      sessionStorage.setItem('user', JSON.stringify(newUser));
    }
  }
  
  //to be used to get current value of user only, not to subscribe to
  getUser(): User{
    return this.user.getValue()!;
  }
  
}