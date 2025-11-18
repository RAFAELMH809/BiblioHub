import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  // true cuando estamos en rutas de autenticación
  isAuthRoute = false;

  constructor(private router: Router) {
    // valor inicial (por si recargas directamente /login o /signup)
    this.updateAuthFlag(this.router.url);

    // escuchar cambios de ruta
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.updateAuthFlag(event.urlAfterRedirects);
      });
  }

  private updateAuthFlag(url: string) {
    this.isAuthRoute =
      url.startsWith('/login') ||
      url.startsWith('/auth') ||
      url.startsWith('/signup'); // ⬅️ ahora sí forma parte del mismo OR
  }
}
