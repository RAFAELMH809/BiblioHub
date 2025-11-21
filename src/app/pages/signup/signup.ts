// src/app/pages/signup/signup.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserStoreService } from '../../core/user-store.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupComponent {
  showPwd1 = false;
  showPwd2 = false;

  nombre = '';
  email = '';
  error = '';

  constructor(
    private router: Router,
    private userStore: UserStoreService
  ) {}

  toggle1() { this.showPwd1 = !this.showPwd1; }
  toggle2() { this.showPwd2 = !this.showPwd2; }

  crearCuenta() {
    const nombre = this.nombre?.trim();
    const email = this.email?.trim();

    if (!email) {
      this.error = 'Ingresa un correo electrónico.';
      return;
    }

    const finalName = nombre || 'Usuario BiblioHub';

    const result = this.userStore.signup(finalName, email);

    if (!result.ok && result.reason === 'email_exists') {
      this.error = 'Este correo ya está registrado. Inicia sesión.';
      return;
    }

    // todo bien → limpiamos error y vamos al onboarding
    this.error = '';
    this.router.navigateByUrl('/onboarding-info');
  }
}
