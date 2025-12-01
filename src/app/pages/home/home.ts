import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type Categoria = {
  key: string;
  titulo: string;
  icon: string;
  bg: string;
  link?: string;
};

type Recomendacion = {
  titulo: string;
  img: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // ===== HERO (banners) =====
  hero: string[] = [
    'assets/covers/banner-1.jpg',
    'assets/covers/banner-2.jpg',
    'assets/covers/banner-3.jpg',
  ];

  // mismas posiciones que en home-user
  heroPositions: string[] = [
    '10% 50%',   // banner-1 más hacia la izquierda
    'center 60%',
    'center 50%',
  ];

  // zoom/desplazamiento por slide
  heroTransforms: string[] = [
    'scale(1.15) translateX(-3%)', // banner-1
    'none',                        // banner-2
    'none',                        // banner-3
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
      this.nextHero(false);
    }, 10000); // 10s entre slides
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

  // ===== CATEGORÍAS =====
  categorias: Categoria[] = [
    {
      key: 'educacion',
      titulo: 'Educación',
      icon: 'assets/home/categorias/iconos/educacion.png',
      bg:   'assets/home/categorias/fondos/educacion.jpg',
      link: '/home',
    },
    {
      key: 'religion',
      titulo: 'Religión',
      icon: 'assets/home/categorias/iconos/religion.png',
      bg:   'assets/home/categorias/fondos/religion.jpg',
      link: '/home',
    },
    {
      key: 'cultura',
      titulo: 'Cultura',
      icon: 'assets/home/categorias/iconos/cultura.png',
      bg:   'assets/home/categorias/fondos/cultura.jpg',
      link: '/home',
    },
    {
      key: 'salud',
      titulo: 'Salud',
      icon: 'assets/home/categorias/iconos/salud.png',
      bg:   'assets/home/categorias/fondos/salud.jpg',
      link: '/home',
    },
    {
      key: 'innovacion',
      titulo: 'Innovación',
      icon: 'assets/home/categorias/iconos/innovacion.png',
      bg:   'assets/home/categorias/fondos/innovacion.jpg',
      link: '/home',
    },
    {
      key: 'gastronomia',
      titulo: 'Gastronomía',
      icon: 'assets/home/categorias/iconos/gastronomia.png',
      bg:   'assets/home/categorias/fondos/gastronomia.jpg',
      link: '/home',
    },
  ];

  // ===== RECOMENDACIONES =====
  recomendaciones: Recomendacion[] = [
    {
      titulo: 'Los tres mundos',
      img: 'assets/home/categorias/fondos/julio.png',
    },
    {
      titulo: 'Ciencia de datos',
      img: 'assets/home/categorias/fondos/cienciadatos.png',
    },
    {
      titulo: 'Más lecturas',
      img: 'assets/home/categorias/fondos/libro3.png',
    },
  ];

  trackByKey = (_: number, c: Categoria) => c.key;
}
