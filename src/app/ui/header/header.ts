import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { SearchService } from '../../core/services/search.service';
import { UserStoreService } from '../../core/user-store.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  // flags de rutas
  isAuthRoute = false;
  isHomeRoute = false;
  isProfileRoute = false;
  isFavoritesRoute = false;

  currentUrl = '';
  // estado real de sesión
  isLoggedIn = false;

  constructor(
    private router: Router,
    private searchService: SearchService,
    private userStore: UserStoreService
  ) {
    // escuchar cambios de sesión
    this.userStore.profile$.subscribe((p) => {
      this.isLoggedIn = !!p;
    });

    // flags iniciales
    this.updateFlags(this.router.url);

    // flags en cada navegación
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.updateFlags(e.urlAfterRedirects));
  }

  private updateFlags(url: string) {
    this.currentUrl = url;

    // rutas de login / registro / onboarding
    this.isAuthRoute =
      url.startsWith('/login') ||
      url.startsWith('/auth') ||
      url.startsWith('/signup') ||
      url.startsWith('/onboarding-info') ||
      url.startsWith('/onboarding');

    // rutas que se ven como "home" (logo normal + barra azul)
    this.isHomeRoute =
      url.startsWith('/home') ||
      url.startsWith('/home-user') ||
      url.startsWith('/book') ||
      url.startsWith('/results') ||
      url.startsWith('/favorites');

    // rutas donde ocultas el header principal
    this.isProfileRoute =
      url.startsWith('/profile') ||
      url.startsWith('/reader');

    // estilo especial para favoritos (si quieres usar la clase)
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

    // nada escrito → NO navega
    if (!cat && !t && !a) return;

    // ejecuta búsqueda (actualiza results$)
    this.searchService.search(cat, t, a);

    // si no estás en /results, navega
    if (!this.currentUrl.startsWith('/results')) {
      this.router.navigateByUrl('/results');
    }
  }
}
