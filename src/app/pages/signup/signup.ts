import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupComponent {
  showPwd1 = false;
  showPwd2 = false;

  constructor(private router: Router) {}

  toggle1(){ this.showPwd1 = !this.showPwd1; }
  toggle2(){ this.showPwd2 = !this.showPwd2; }

  crearCuenta() {
    // Aquí podrías validar campos. Por ahora solo navegamos:
    this.router.navigateByUrl('/onboarding/info');
  }
}
