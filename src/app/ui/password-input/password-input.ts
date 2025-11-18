import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-password-input',
  standalone: true,
  templateUrl: './password-input.html',
  styleUrls: ['./password-input.scss'],
})
export class PasswordInputComponent {
  @Input() placeholder = 'Contraseña';
  show = false;
}
