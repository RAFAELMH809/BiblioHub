import { Component } from '@angular/core';
import { InputComponent } from '../../shared/ui/input/input';
import { PasswordInputComponent } from '../../shared/ui/password-input/password-input';
import { ButtonComponent } from '../../shared/ui/button/button';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [InputComponent, PasswordInputComponent, ButtonComponent],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupComponent {}
