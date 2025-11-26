import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

type ReaderBook = {
  id: string;
  title: string;
  pages: number;
  cover: string;
};

// Libros que se pueden leer en el reader
const READER_BOOKS: ReaderBook[] = [
  {
    id: 'ingenieria-soft',
    title: 'Ingeniería del Software',
    pages: 118,
    cover: 'assets/home/categorias/fondos/software.png',
  },
  {
    id: 'ciencia-datos',
    title: 'Ciencia de Datos',
    pages: 118,
    cover: 'assets/home/categorias/fondos/cienciadatos.png',
  },
  {
    id: 'produccion-patrones',
    title: 'Producción a los Patrones',
    pages: 200,
    cover: 'assets/home/categorias/fondos/patrones.png',
  },
];

// Imágenes de lectura por libro (portada + páginas simuladas)
const READER_IMAGES: Record<string, string[]> = {
  'ciencia-datos': [
    'assets/home/categorias/fondos/cienciadatos.png', // portada
    'assets/read/ciencia1.jpg',
    'assets/read/ciencia2.jpg',
  ],
  'ingenieria-soft': [
    'assets/home/categorias/fondos/software.png', // portada
    'assets/read/software1.jpg',
    'assets/read/software2.jpg',
  ],
  'produccion-patrones': [
    'assets/home/categorias/fondos/patrones.png', // portada
    'assets/read/patrones1.jpg',
    'assets/read/patrones2.jpg',
  ],
};

@Component({
  selector: 'app-reader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reader.html',
  styleUrls: ['./reader.scss'],
})
export class ReaderComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  book: ReaderBook | null = null;

  images: string[] = [];
  currentPage = 1;
  currentImage = '';

  constructor() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    const found = READER_BOOKS.find((b) => b.id === id);
    if (!found) {
      this.router.navigateByUrl('/home-user');
      return;
    }

    this.book = found;
    this.currentPage = 1;

    this.images = READER_IMAGES[id] ?? [found.cover];
    this.currentImage = this.images[0];
  }

  // Slider de páginas
  onSliderChange(value: string) {
    const page = Number(value) || 1;
    this.currentPage = page;

    if (!this.images.length) return;

    // índice de imagen: página 1 = índice 0, pág 2 = índice 1, etc.
    const idx = Math.min(page - 1, this.images.length - 1);
    this.currentImage = this.images[idx];
  }

  // Logo BiblioHub → home del usuario
  goHomeUser() {
    this.router.navigateByUrl('/home-user');
  }

  // Avatar → perfil
  goProfile() {
    this.router.navigateByUrl('/profile');
  }

  // X → volver al detalle del libro
  close() {
    if (this.book) {
      this.router.navigate(['/book', this.book.id]);
    } else {
      this.router.navigateByUrl('/home-user');
    }
  }
}
