import { Component } from '@angular/core';
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
  id: string;      // 👈 id que usaremos en /book/:id
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
export class HomeUserComponent {
  constructor(private router: Router) {}

  // HERO igual que en home
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

  // CATEGORÍAS igual que en home
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

  // RECOMENDACIONES
  // ⚠️ Importante: los id deben coincidir con los que pusimos en BOOKS de book-detail.ts
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

  // 👇 Cuando el usuario da click en "Leer más..."
  goToBook(r: Recomendacion) {
    this.router.navigate(['/book', r.id]);
  }
}
