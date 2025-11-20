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
  // rutas de autenticación (login, signup, onboarding)
  isAuthRoute = false;

  // estamos en /home ?
  isHomeRoute = false;

  // url actual (para el click del logo en auth)
  currentUrl = '';

  constructor(private router: Router) {
    this.updateFlags(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.updateFlags(event.urlAfterRedirects);
      });
  }

  private updateFlags(url: string) {
    this.currentUrl = url;

    // login / signup / onboarding
    this.isAuthRoute =
      url.startsWith('/login') ||
      url.startsWith('/auth') ||
      url.startsWith('/signup') ||
      url.startsWith('/onboarding');

    // home (incluye / y /home/lo-que-sea)
    this.isHomeRoute = url === '/' || url.startsWith('/home');
  }

  // Click en el logo cuando estamos en header de auth (login / signup / onboarding)
  onAuthLogoClick() {
    // En onboarding NO hacemos nada
    if (this.currentUrl.startsWith('/onboarding')) {
      return;
    }

    // En login y signup sí vamos al home
    this.router.navigateByUrl('/home');
  }
}
