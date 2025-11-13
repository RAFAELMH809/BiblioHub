import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

type Step = {
  key: 'rol' | 'nivel' | 'area' | 'objetivo' | 'tiempo';
  title: string;
  options: string[];
};

@Component({
  selector: 'app-onboarding-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onboarding-info.html',
  styleUrls: ['./onboarding-info.scss'],
})
export class OnboardingInfoComponent {
  constructor(private router: Router) {}

  // Ilustración a la derecha
  heroSrc = 'assets/auth/planificacion.jpg';

  // 5 pasos (incluye Rol como primer paso)
  steps: Step[] = [
    {
      key: 'rol',
      title: 'Selecciona tu rol',
      options: ['Estudiante', 'Docente', 'Profesionista', 'Investigador (a)', 'Aficionado (a)'],
    },
    {
      key: 'nivel',
      title: 'Selecciona tu nivel de estudios',
      options: ['Secundaria', 'Bachillerato', 'Técnico', 'Licenciatura', 'Posgrado'],
    },
    {
      key: 'area',
      title: 'Selecciona tu área de interés',
      options: ['Ingeniería', 'Salud', 'Negocios', 'Derecho', 'Educación', 'Cultura'],
    },
    {
      key: 'objetivo',
      title: '¿Cuál es tu objetivo principal?',
      options: [
        'Aprender desde cero',
        'Profundizar/actualizar',
        'Investigación',
        'Enseñanza',
        'Ocio/Lectura general',
      ],
    },
    {
      key: 'tiempo',
      title: '¿Cuánto tiempo dedicas a la lectura por semana?',
      options: ['Menos de 2h', '2-5h', '5-10h', '10-15h', 'Más de 15h'],
    },
  ];

  // selección del usuario
  selected: Record<Step['key'], string | null> = {
    rol: null,
    nivel: null,
    area: null,
    objetivo: null,
    tiempo: null,
  };

  // navegación
  i = 0;

  // para re-disparar la animación del lado derecho
  bumpKey = 0;
  private bumpImage() {
    this.bumpKey++; // cada cambio de número vuelve a animar el <img>
  }

  get step(): Step {
    return this.steps[this.i];
  }

  choose(opt: string) {
    this.selected[this.step.key] = opt;
  }

  canNext(): boolean {
    return Boolean(this.selected[this.step.key]);
  }

  next() {
    if (!this.canNext()) return;
    if (this.i < this.steps.length - 1) {
      this.i++;
      this.bumpImage();
    } else {
      // último paso → cerrar / ir a home (o a la siguiente pantalla que quieras)
      this.close();
    }
  }

  prev() {
    if (this.i > 0) {
      this.i--;
      this.bumpImage();
    }
  }

  close() {
      this.router.navigateByUrl('/onboarding/genres');

  }

  isActive(opt: string): boolean {
    return this.selected[this.step.key] === opt;
  }
}
