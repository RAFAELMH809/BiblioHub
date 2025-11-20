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

  // SOLO home de usuario (/home-user)
  isUserHomeRoute = false;

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

    this.isUserHomeRoute = url.startsWith('/home-user');

    // para agrandar el logo en ambos homes
    this.isHomeRoute = url.startsWith('/home') || url.startsWith('/home-user');
  }

  onAuthLogoClick() {
    if (this.currentUrl.startsWith('/onboarding')) return;
    this.router.navigateByUrl('/home');
  }
}
