// src/app/pages/login/login.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserStoreService } from '../../core/user-store.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  showPwd = false;

  email = '';
  error = '';

  constructor(
    private router: Router,
    private userStore: UserStoreService
  ) {}

  togglePwd() {
    this.showPwd = !this.showPwd;
  }

  iniciarSesion() {
    const email = this.email?.trim();
    if (!email) {
      this.error = 'Ingresa un correo electrónico.';
      return;
    }

    const result = this.userStore.signin(email);

    if (!result.ok && result.reason === 'not_found') {
      this.error = 'Este usuario no está registrado. Crea una cuenta.';
      return;
    }

    // todo bien
    this.error = '';
    this.router.navigateByUrl('/home-user');
  }
}
