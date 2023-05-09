import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);

  hide = true;

  constructor(private authService: AuthService){ }

  onRegister(): void {
    if(this.email.valid && this.password.valid && this.email.valid){
      this.authService.createUser(this.email.value!, this.password.value!, this.name.value!);
    }
  }

  getErrorMessage(): string {
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
