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
  pdf: string;     // ruta al PDF en assets
};

// 👇 Aquí defines tus libros. Ajusta títulos, autores, descripciones e imágenes.
const BOOKS: BookDetail[] = [
  {
    id: 'ingenieria-soft',
    title: 'Ingeniería del Software',
    author: 'Ian Sommerville',
    cover: 'assets/home/categorias/fondos/software.png',
    description:
      'Ingeniería del Software de Ian Sommerville es un libro de referencia clásica en la disciplina, ampliamente utilizado en cursos universitarios y por profesionales del sector. Ofrece una visión completa del desarrollo de software, abarcando desde los fundamentos hasta temas avanzados como sistemas críticos, diseño arquitectónico, métodos ágiles, reutilización de software y evolución de sistemas.El libro está estructurado en seis partes principales: visión general, requerimientos, diseño, desarrollo, verificación y validación, y gestión del software. Cada capítulo incluye objetivos claros, puntos clave, lecturas recomendadas y ejercicios, lo que lo hace ideal tanto para el estudio como para la consulta profesional...',
    pages: 118,
    hours: '1-2',
    words: '29 Mil',
    pdf: 'assets/read/software.pdf',
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
    pdf: 'assets/read/cienciadedatos.pdf',
  },
  {
    id: 'produccion-patrones',
    title: 'Producción a los Patrones',
    author: 'Oscar Javier Blancarte Iturralde',
    cover: 'assets/home/categorias/fondos/patrones.png',
    description:
      'Este libro aborda cómo describir y comunicar la arquitectura de software de forma ágil, enfocándose en lo que realmente ayuda al equipo a construir y mantener sistemas complejos. Explica por qué la documentación tradicional suele fallar (es pesada, se queda obsoleta, nadie la lee) y propone en su lugar una forma de documentar ligera, visual y práctica, basada en diagramas claros, decisiones arquitectónicas bien justificadas y herramientas que permiten manejar la documentación como si fuera código Además, presenta técnicas y ejemplos para integrar la documentación en el flujo de trabajo ágil, sin frenar el desarrollo. Muestra cómo la documentación puede servir como guía para la toma de decisiones técnicas.....',
    pages: 200,
    hours: '2-3',
    words: '40 Mil',
    pdf: 'assets/read/patrones.pdf',
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
    if (!this.book?.pdf) return;

    // Creamos un enlace "fantasma" para disparar la descarga del PDF
    const link = document.createElement('a');
    link.href = this.book.pdf;
    link.download = `${this.book.title}.pdf`;
    link.target = '_blank'; // abre en otra pestaña si el navegador lo prefiere
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
