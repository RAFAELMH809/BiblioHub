import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  isAuthRoute = false;
  isHomeRoute = false;
  isUserHomeRoute = false;
  isProfileRoute = false;
  isFavoritesRoute = false;

  currentUrl = '';

  constructor(
    private router: Router,
    private searchService: SearchService
  ) {
    this.updateFlags(this.router.url);

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.updateFlags(e.urlAfterRedirects));
  }

  private updateFlags(url: string) {
  this.currentUrl = url;

  // Rutas de autenticación: login, registro, onboarding
  this.isAuthRoute =
    url.startsWith('/login') ||
    url.startsWith('/auth') ||
    url.startsWith('/signup') ||
    url.startsWith('/onboarding-info') ||
    url.startsWith('/onboarding');

  // 🧩 Rutas que usan HEADER DE USUARIO (Favoritos + avatar)
  //    👉 OJO: AQUÍ YA QUITAMOS '/results'
  this.isUserHomeRoute =
    url.startsWith('/home-user') ||
    url.startsWith('/book') ||
    url.startsWith('/reader') ||
    url.startsWith('/favorites');

  // Rutas que comparten estilo de home (logo grande, etc.)
  // Si quieres que /results tenga también el estilo de home,
  // puedes dejarlo aquí o quitarlo, esto solo afecta tamaños.
  this.isHomeRoute =
    url.startsWith('/home') ||
    url.startsWith('/home-user') ||
    url.startsWith('/book') ||
    url.startsWith('/results');

  // Rutas donde NO se muestra el header completo
  this.isProfileRoute =
    url.startsWith('/profile') ||
    url.startsWith('/reader');

  this.isFavoritesRoute = url.startsWith('/favorites');
}


  onAuthLogoClick() {
    if (this.currentUrl.startsWith('/onboarding')) return;
    this.router.navigateByUrl('/home');
  }

  /** Buscar SOLO al darle click */
  onSearchClick(category: string, title: string, author: string) {
    const cat = (category ?? '').trim();
    const t = (title ?? '').trim();
    const a = (author ?? '').trim();

    // nada escrito → NO navega, no hace nada
    if (!cat && !t && !a) {
      return;
    }

    // ejecuta búsqueda (esto actualiza el servicio + results$)
    this.searchService.search(cat, t, a);

    // si ya estás en /results, no pasa nada,
    // sólo se actualizarán las cards.
    if (!this.currentUrl.startsWith('/results')) {
      this.router.navigateByUrl('/results');
    }
  }
}
