import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InputComponent } from '../../shared/ui/input/input';
import { PasswordInputComponent } from '../../shared/ui/password-input/password-input';
import { ButtonComponent } from '../../shared/ui/button/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, InputComponent, PasswordInputComponent, ButtonComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {}
