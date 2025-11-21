// src/app/pages/onboarding-info/onboarding-info.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStoreService } from '../../core/user-store.service';

type StepKey = 'rol' | 'nivel' | 'area' | 'objetivo' | 'tiempo';

type Step = {
  key: StepKey;
  title: string;
  options: string[];
};

type Genero = {
  key: string;
  nombre: string;
  icon: string;
  selected?: boolean;
};

@Component({
  selector: 'app-onboarding-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onboarding-info.html',
  styleUrls: ['./onboarding-info.scss'],
})
export class OnboardingInfoComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private userStore = inject(UserStoreService);

  // para saber si venimos desde Perfil
  private from = this.route.snapshot.queryParamMap.get('from');

  // ----- Pasos 1-5 -----
  steps: Step[] = [
    {
      key: 'rol',
      title: '¿Desde qué rol utilizarás la plataforma?',
      options: [
        'Estudiante',
        'Docente',
        'Profesionista',
        'Investigador (a)',
        'Aficionado (a)',
      ],
    },
    {
      key: 'nivel',
      title: 'Selecciona tu nivel de estudios',
      options: [
        'Secundaria',
        'Bachillerato',
        'Técnico',
        'Licenciatura',
        'Posgrado',
        'Autodidacta',
      ],
    },
    {
      key: 'area',
      title: 'Selecciona tu área de interés',
      options: ['Ingeniería', 'Salud', 'Negocios', 'Derecho', 'Educación', 'Otros'],
    },
    {
      key: 'objetivo',
      title: '¿Cuál es tu objetivo principal al usar la plataforma?',
      options: [
        'Aprender desde cero',
        'Profundizar o actualizar',
        'Investigación',
        'Enseñanza',
        'Ocio/Lectura general',
        'Otros',
      ],
    },
    {
      key: 'tiempo',
      title: '¿Cuánto tiempo le dedicas a la lectura por semana ?',
      options: ['Menos de 2h', '2-5 h', '5-10 h', '10-15 h', 'Más de 15h'],
    },
  ];

  // ----- Paso 6: géneros -----
  generos: Genero[] = [
  { key: 'educacion', nombre: 'Educación', icon: 'assets/generos/educaciones.png' },
  { key: 'salud', nombre: 'Salud', icon: 'assets/generos/saludcategoria.png' },
  { key: 'cultura', nombre: 'Cultura', icon: 'assets/generos/culturas.png' },
  { key: 'religion', nombre: 'Religión', icon: 'assets/generos/religiones.png' },
  { key: 'gastronomia', nombre: 'Gastronomía', icon: 'assets/generos/gastronomias.png' },
  { key: 'ingenieria', nombre: 'Ingeniería', icon: 'assets/generos/ingenieria.png' },
  { key: 'historia', nombre: 'Historia', icon: 'assets/generos/historia.png' },
  { key: 'tecnologias', nombre: 'Tecnologías', icon: 'assets/generos/tecnologias.png' },
  { key: 'negocios', nombre: 'Negocios', icon: 'assets/generos/negocios.png' },
  { key: 'ciencias', nombre: 'Ciencias', icon: 'assets/generos/ciencia.png' },
  { key: 'matematicas', nombre: 'Matematicas', icon: 'assets/generos/matematicas.png' },
  { key: 'arte', nombre: 'Arte', icon: 'assets/generos/arte.png' },
];


  // índice actual (0..steps.length, el último es géneros)
  i = 0;

  // selección del usuario
  selected: Record<StepKey | 'generos', any> = {
    rol: null,
    nivel: null,
    area: null,
    objetivo: null,
    tiempo: null,
    generos: [],
  };

  // para animación de la imagen
  bumpKey = 0;
  private bumpImage() {
    this.bumpKey++;
  }

  constructor() {
    // Prefill desde el usuario logueado (si existe)
    const profile = this.userStore.profile;
    if (profile) {
      const info = profile.info || {};
      this.selected.rol = info.rol ?? null;
      this.selected.nivel = info.nivel ?? null;
      this.selected.area = info.area ?? null;
      this.selected.objetivo = info.objetivo ?? null;
      this.selected.tiempo = info.tiempo ?? null;

      if (profile.genres?.length) {
        this.generos.forEach((g) => {
          g.selected = profile.genres.includes(g.key);
        });
      }
    }
  }

  get isGenresStep(): boolean {
    return this.i === this.steps.length;
  }

  get isLastStep(): boolean {
    return this.i === this.steps.length;
  }

  get step(): Step | null {
    return this.isGenresStep ? null : this.steps[this.i];
  }

  get bullets(): any[] {
    return Array(this.steps.length + 1);
  }

  get heroSrc(): string {
    const imgs = [
      'assets/auth/planificacion.jpg',
      'assets/auth/kid.jpg',
      'assets/auth/categoricas.jpg',
      'assets/auth/flecha.jpg',
      'assets/auth/atiende.jpg',
    ];
    const index = Math.min(this.i, imgs.length - 1);
    return imgs[index];
  }

  // ---------- selección pasos normales ----------
  choose(opt: string) {
    if (this.isGenresStep || !this.step) return;
    this.selected[this.step.key] = opt;
  }

  isActive(opt: string): boolean {
    if (this.isGenresStep || !this.step) return false;
    return this.selected[this.step.key] === opt;
  }

  // ---------- géneros ----------
  get countSelectedGenres(): number {
    return this.generos.filter((g) => g.selected).length;
  }

  toggleGenero(g: Genero) {
    g.selected = !g.selected;
  }

  // ---------- navegación ----------
  canNext(): boolean {
    if (this.isGenresStep) {
      return this.countSelectedGenres >= 3;
    }
    const current = this.step;
    if (!current) return false;
    return Boolean(this.selected[current.key]);
  }

  next() {
    if (!this.canNext()) return;

    if (!this.isGenresStep) {
      this.i++;
      this.bumpImage();
      return;
    }

    // ya estamos en géneros → finalizar
    this.finish();
  }

  prev() {
    if (this.i > 0) {
      this.i--;
      this.bumpImage();
    }
  }

  private finish() {
    const seleccion = this.generos.filter((g) => g.selected).map((g) => g.key);
    this.selected.generos = seleccion;

    // Guarda en el usuario logueado
    this.userStore.patchInfo({
      rol: this.selected.rol,
      nivel: this.selected.nivel,
      area: this.selected.area,
      objetivo: this.selected.objetivo,
      tiempo: this.selected.tiempo,
    });

    this.userStore.setGenres(seleccion);

    this.close();
  }

  private close() {
    if (this.from === 'profile') {
      // Si vino desde el perfil, regresa al perfil
      this.router.navigateByUrl('/profile');
    } else {
      // Flujo normal: después de crear cuenta
      this.router.navigateByUrl('/home-user');
    }
  }
}
