// src/app/layout/header/header.ts
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
  // login / signup / onboarding
  isAuthRoute = false;

  // home público o home de usuario (para agrandar logo)
  isHomeRoute = false;

  // rutas en contexto de usuario (home-user, books, reader, favorites...)
  isUserHomeRoute = false;

  // rutas donde NO queremos header global (perfil, reader)
  isProfileRoute = false;

  // SOLO favoritos
  isFavoritesRoute = false;

  currentUrl = '';

  constructor(private router: Router) {
    this.updateFlags(this.router.url);

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.updateFlags(e.urlAfterRedirects));
  }

  private updateFlags(url: string) {
    this.currentUrl = url;

    // rutas de autenticación
    this.isAuthRoute =
      url.startsWith('/login') ||
      url.startsWith('/auth') ||
      url.startsWith('/signup') ||
      url.startsWith('/onboarding');

    // modo usuario (home de usuario, detalle, reader, favoritos)
    this.isUserHomeRoute =
      url.startsWith('/home-user') ||
      url.startsWith('/book') ||
      url.startsWith('/reader') ||
      url.startsWith('/favorites');

    // logo grande en home, home-user y detalle de libro
    this.isHomeRoute =
      url.startsWith('/home') ||
      url.startsWith('/home-user') ||
      url.startsWith('/book');

    // aquí ocultamos header en perfil Y en reader
    this.isProfileRoute =
      url.startsWith('/profile') ||
      url.startsWith('/reader');

    // bandera SOLO para /favorites
    this.isFavoritesRoute = url.startsWith('/favorites');
  }

  onAuthLogoClick() {
    if (this.currentUrl.startsWith('/onboarding')) return;
    this.router.navigateByUrl('/home');
  }
}
