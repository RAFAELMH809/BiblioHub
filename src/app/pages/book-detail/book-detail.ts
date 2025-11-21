import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

type BookDetail = {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  pages: number;
  hours: string;   // "1-2", "2-3", etc.
  words: string;   // "29 Mil", etc.
};

// 👇 Aquí defines tus libros. Ajusta títulos, autores, descripciones e imágenes.
const BOOKS: BookDetail[] = [
  {
    id: 'ingenieria-soft',
    title: 'Ingeniería del Software',
    author: 'Ian Sommerville',
    cover: 'assets/home/categorias/fondos/software.png',
    description:
      'Descripción del libro de Ingeniería del Software. Aquí puedes colocar el texto que tienes en tu mockup.',
    pages: 118,
    hours: '1-2',
    words: '29 Mil',
  },
  {
    id: 'ciencia-datos',
    title: 'Ciencia de Datos',
    author: 'John D. Kelleher, Brendan Tierney',
    cover: 'assets/home/categorias/fondos/cienciadatos.png',
    description:
      'El crecimiento en el uso de la ciencia de datos en nuestras sociedades está impulsado por la aparición del big data y las redes sociales, la aceleración de la potencia informática, la reducción masiva en el costo de la memoria de la computadora y el desarrollo de métodos más potentes para el análisis y modelado de datos, como el aprendizaje profundo. Todos estos factores juntos hacen que nunca haya sido tan fácil para las organizaciones recopilar, almacenar y procesar datos. Al mismo tiempo, estas innovaciones técnicas y la aplicación más amplia de la ciencia de datos hacen que los desafíos éticos relacionados con el uso de datos y la privacidad individual nunca han sido tan apremiantes...',
    pages: 118,
    hours: '1-2',
    words: '29 Mil',
  },
  {
    id: 'produccion-patrones',
    title: 'Producción a los Patrones',
    author: 'Autor del libro',
    cover: 'assets/home/categorias/fondos/patrones.png',
    description:
      'Descripción del libro Producción a los Patrones. Ajusta este texto al de tu maqueta.',
    pages: 200,
    hours: '2-3',
    words: '40 Mil',
  },
];

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.scss'],
})
export class BookDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  book: BookDetail | null = null;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    const found = BOOKS.find((b) => b.id === id);
    if (!found) {
      // si no existe el libro, regresa al home del usuario
      this.router.navigateByUrl('/home-user');
    } else {
      this.book = found;
    }
  }

  goBack() {
    this.router.navigateByUrl('/home-user');
  }

  leerLibro() {
    if (!this.book) return;
    this.router.navigate(['/reader', this.book.id]);
  }

  descargar() {
    // Aquí podrías enlazar a un PDF u otra acción
    // Por ahora solo un console.log
    console.log('Descargar libro:', this.book?.title);
  }
}
