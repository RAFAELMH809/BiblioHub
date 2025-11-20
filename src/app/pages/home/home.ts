import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type Categoria = {
  key: string;
  titulo: string;      // (Educación, Religión, etc.)
  icon: string;        // ruta del ícono blanco
  bg: string;          // ruta del fondo (portada)
  link?: string;       // navegación (mock por ahora)
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
export class HomeComponent {
  // === HERO (banners) ===
  hero: string[] = [
    'assets/covers/banner-1.jpg',
    'assets/covers/banner-2.jpg',
    'assets/covers/banner-3.jpg',
  ];
  heroIndex = 0;

  prevHero(): void {
    this.heroIndex = (this.heroIndex - 1 + this.hero.length) % this.hero.length;
  }
  nextHero(): void {
    this.heroIndex = (this.heroIndex + 1) % this.hero.length;
  }
  goHero(i: number): void {
    this.heroIndex = i;
  }

  // === CATEGORÍAS (6 tarjetas) ===
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

  // === RECOMENDACIONES ===
  recomendaciones: Recomendacion[] = [
    {
      titulo: 'Los tres mundos',
      img: 'assets/home/categorias/fondos/julio.png',
    },
    {
      titulo: 'Ciencia de datos',
      img: 'assets/home/categorias/fondos/cienciadatos.png',
      imgAlt: 'Ciencia de datos',
    } as any, // si solo quieres evitar TS aquí, puedes quitar imgAlt y el "as any"
    {
      titulo: 'Más lecturas',
      img: 'assets/home/categorias/fondos/libro3.png',
    },
  ];

  trackByKey = (_: number, c: Categoria) => c.key;
}
