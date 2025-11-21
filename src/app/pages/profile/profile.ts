import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  UserStoreService,
  UserProfile,
} from '../../core/user-store.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfileComponent {
  private router = inject(Router);
  private userStore = inject(UserStoreService);

  profile$ = this.userStore.profile$;

  private genreLabels: Record<string, string> = {
    educacion: 'Educación',
    salud: 'Salud',
    cultura: 'Cultura',
    religion: 'Religión',
    gastronomia: 'Gastronomía',
    ingenieria: 'Ingeniería',
    historia: 'Historia',
    tecnologias: 'Tecnologías',
    negocios: 'Negocios',
    ciencias: 'Ciencias',
    matematicas: 'Matemáticas',
    arte: 'Arte',
  };

  formatGenres(genres: string[] = []): string {
    return genres
      .map((g) => this.genreLabels[g] || g)
      .join(', ');
  }

  getDescription(user: UserProfile | null): string {
    if (!user || !user.info) {
      return 'Completa tu información para personalizar tus recomendaciones.';
    }
    const { rol, area, objetivo } = user.info;
    if (rol && area) return `${rol} en el área de ${area}`;
    if (rol) return rol;
    if (area) return `Área: ${area}`;
    if (objetivo) return objetivo;
    return 'Completa tu información para personalizar tus recomendaciones.';
  }

  goBack() {
    window.history.back();
  }

  goToOnboardingInfo() {
    this.router.navigate(['/onboarding-info'], {
      queryParams: { from: 'profile' },
    });
  }

  goHomeUser() {
    this.router.navigateByUrl('/home-user');
  }

  logout() {
    this.userStore.logout();
    this.router.navigateByUrl('/home');
  }
}
