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

  // para ocultar header en perfil
  isProfileRoute = false;

  currentUrl = '';

  constructor(private router: Router) {
    this.updateFlags(this.router.url);

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.updateFlags(e.urlAfterRedirects));
  }

  private updateFlags(url: string) {
    this.currentUrl = url;

    this.isAuthRoute =
      url.startsWith('/login') ||
      url.startsWith('/auth') ||
      url.startsWith('/signup') ||
      url.startsWith('/onboarding');

    // 👇 aquí tratamos estas rutas como "modo usuario"
    this.isUserHomeRoute =
      url.startsWith('/home-user') ||
      url.startsWith('/book') ||
      url.startsWith('/reader') ||
      url.startsWith('/favorites');

    // solo los dos homes para el logo grande
    this.isHomeRoute =
  url.startsWith('/home') ||
  url.startsWith('/home-user') ||
  url.startsWith('/book');   // 👈 aquí agregas la vista del libro

    // perfil sin header global
    this.isProfileRoute = url.startsWith('/profile');
  }

  onAuthLogoClick() {
    if (this.currentUrl.startsWith('/onboarding')) return;
    this.router.navigateByUrl('/home');
  }
}
