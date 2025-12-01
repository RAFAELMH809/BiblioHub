import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

type Categoria = {
  key: string;
  titulo: string;
  icon: string;
  bg: string;
  link?: string;
};

type Recomendacion = {
  id: string;      // id que usaremos en /book/:id
  titulo: string;
  img: string;
};

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-user.html',
  styleUrls: ['./home-user.scss'],
})
export class HomeUserComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  // ================= HERO (carrusel) =================

  // ================= HERO (carrusel) =================

// Imágenes del carrusel
hero: string[] = [
  'assets/covers/banner-1.jpg',
  'assets/covers/banner-2.jpg',
  'assets/covers/banner-3.jpg',
];

// Posición de recorte por imagen
heroPositions: string[] = [
  '10% 50%',    // banner-1 -> más hacia la izquierda (x=20%, y=50%)
  'center 60%', // banner-2
  'center 50%',    // banner-3
];


// 🔹 Transform por imagen (zoom + desplazamiento)
heroTransforms: string[] = [
  'scale(1.15) translateX(-3%)', // banner-1: un poco “zoom” y movido a la izquierda
  //scale(0.) translateX(-3%)',                 // banner-2: ligero zo

];

heroIndex = 0;
private heroTimer: any = null;

ngOnInit(): void {
  this.startHeroAuto();
}

ngOnDestroy(): void {
  this.clearHeroAuto();
}

/** Cambio automático cada cierto tiempo */
private startHeroAuto(): void {
  this.clearHeroAuto();
  this.heroTimer = setInterval(() => {
    this.nextHero(false);   // false = no reiniciar timer dentro
  }, 10000);                 // ⬅️ tiempo entre slides (6s)
}

private clearHeroAuto(): void {
  if (this.heroTimer) {
    clearInterval(this.heroTimer);
    this.heroTimer = null;
  }
}

/** Mover el carrusel al índice indicado */
private showHero(targetIndex: number, resetTimer: boolean): void {
  const total = this.hero.length;
  this.heroIndex = (targetIndex + total) % total;

  if (resetTimer) {
    this.startHeroAuto();
  }
}

prevHero(resetTimer: boolean = true): void {
  this.showHero(this.heroIndex - 1, resetTimer);
}

nextHero(resetTimer: boolean = true): void {
  this.showHero(this.heroIndex + 1, resetTimer);
}

goHero(i: number): void {
  this.showHero(i, true);
}



  /* ================= CATEGORÍAS ================= */

  categorias: Categoria[] = [
    {
      key: 'educacion',
      titulo: 'Educación',
      icon: 'assets/home/categorias/iconos/educacion.png',
      bg: 'assets/home/categorias/fondos/educacion.jpg',
      link: '/home-user',
    },
    {
      key: 'religion',
      titulo: 'Religión',
      icon: 'assets/home/categorias/iconos/religion.png',
      bg: 'assets/home/categorias/fondos/religion.jpg',
      link: '/home-user',
    },
    {
      key: 'cultura',
      titulo: 'Cultura',
      icon: 'assets/home/categorias/iconos/cultura.png',
      bg: 'assets/home/categorias/fondos/cultura.jpg',
      link: '/home-user',
    },
    {
      key: 'salud',
      titulo: 'Salud',
      icon: 'assets/home/categorias/iconos/salud.png',
      bg: 'assets/home/categorias/fondos/salud.jpg',
      link: '/home-user',
    },
    {
      key: 'innovacion',
      titulo: 'Innovación',
      icon: 'assets/home/categorias/iconos/innovacion.png',
      bg: 'assets/home/categorias/fondos/innovacion.jpg',
      link: '/home-user',
    },
    {
      key: 'gastronomia',
      titulo: 'Gastronomía',
      icon: 'assets/home/categorias/iconos/gastronomia.png',
      bg: 'assets/home/categorias/fondos/gastronomia.jpg',
      link: '/home-user',
    },
  ];

  /* ================= RECOMENDACIONES ================= */

  recomendaciones: Recomendacion[] = [
    {
      id: 'ingenieria-soft',
      titulo: 'Ingeniería de Software',
      img: 'assets/home/categorias/fondos/software.png',
    },
    {
      id: 'ciencia-datos',
      titulo: 'Ciencia de Datos',
      img: 'assets/home/categorias/fondos/cienciadatos.png',
    },
    {
      id: 'produccion-patrones',
      titulo: 'Patrones de diseño',
      img: 'assets/home/categorias/fondos/patrones.png',
    },
  ];

  trackByKey = (_: number, c: Categoria) => c.key;

  goToBook(r: Recomendacion) {
    this.router.navigate(['/book', r.id]);
  }
}
