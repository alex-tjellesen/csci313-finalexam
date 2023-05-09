import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  
  hide = true;

  constructor(private authService: AuthService, private snackBar: MatSnackBar){}

  onLogin(): void {
    if(this.email.valid && this.password.valid){
      this.authService.login(this.email.value!, this.password.value!);
    }else{
      this.snackBar.open('Invalid email or password.', 'Dismiss', { duration: 3000 })
    }
  }

  onLogout(): void{
    this.authService.logout();
  }
}
