import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FavoritesService } from '../../core/services/favorites.service';

type FavoriteBook = {
  id: string;
  title: string;
  author: string;
  cover: string;
  shortDescription: string;
};

const ALL_BOOKS: FavoriteBook[] = [
  {
    id: 'ciencia-datos',
    title: 'Ciencia de datos',
    author: 'Kelleher & Tierney',
    cover: 'assets/home/categorias/fondos/cienciadatos.png',
    shortDescription: 'El crecimiento en el uso de la ciencia de datos en nuestras sociedades está impulsado por la aparición del big data y las redes sociales, la aceleración de la potencia informática, la reducción masiva en el costo de la memoria de la computadora y el desarrollo de métodos más potentes para el análisis y modelado de datos, como el aprendizaje profundo. Todos estos factores juntos hacen que nunca haya sido tan fácil para las organizaciones recopilar, almacenar y procesar datos. Al mismo tiempo, estas innovaciones técnicas y la aplicación más amplia de la ciencia de datos hacen que los desafíos éticos relacionados con el uso de datos y la privacidad individual nunca han sido tan apremiantes…',
  },
  {
    id: 'ingenieria-soft',
    title: 'Ingeniería del Software',
    author: 'Ian Sommerville',
    cover: 'assets/home/categorias/fondos/software.png',
    shortDescription: 'Nueva edición de un clásico de la Ingeniería del Software. Contiene 4 nuevos capítulos de aplicación de arquitecturas, métodos rápidos de desarrollo del software, ingeniería del software orientado a componentes y evolución del software. PARTE 1 Visión general Capítulo 1 Introducción Capítulo 2: Sistemas socio-técnicos Capítulo 3: Sistemas críticos Capítulo 4: Procesos del software Capítulo 5: Gestión de proyectos PARTE 2 Requerimientos Capítulo 6: Requerimientos del software Capítulo 7: Procesos de la ingeniería de requerimientos Capítulo 8: Modelos del sistema Capítulo 9: Especificación de sistemas críticos Capítulo 10: Especificación formal PARTE 3 Diseño Capítulo 11: Diseño arquitectónico Capítulo 12: Arquitecturas de sistemas distribuidos Capítulo 13: Arquitecturas de aplicaciones…',
  },
  {
    id: 'produccion-patrones',
    title: 'Introducción a los patrones de diseño',
    author: 'Autor del libro',
    cover: 'assets/home/categorias/fondos/patrones.png',
    shortDescription: 'Hoy en día aprender patrones de diseño no es una cualidad más, si no una obligación. Y es que estudiar y comprender los patrones de diseño nos convierte en un mejor programador/arquitecto y es clave para conseguir una mejor posición en el mundo laboral.Este libro fue creado con la intención de enseñar a sus lectores cómo utilizar los patrones de diseño de una forma clara y simple desde un enfoque práctico y con escenarios del mundo real.Tengo que aceptar que este no es un libro convencional de patrones de diseño debido, principalmente, a que no sigue la misma estructura de las primordiales obras relacionadas con este tema. En su lugar, me quise enfocar en ofrecer una perspectiva del mundo real, en donde el lector pueda aprender a utilizar los patrones de diseño en entornos reales y que…',
  },
];

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.scss'],
})
export class FavoritesComponent {
  constructor(
    private favs: FavoritesService,
    private router: Router
  ) {}

  get favoriteBooks(): FavoriteBook[] {
    const ids = this.favs.getAllIds();
    return ALL_BOOKS.filter((b) => ids.includes(b.id));
  }

  isFavorite(id: string) {
    return this.favs.isFavorite(id);
  }

  toggleFavorite(id: string) {
    this.favs.toggle(id);
  }

  leerLibro(book: FavoriteBook) {
    this.router.navigate(['/reader', book.id]);
  }

  descargar(book: FavoriteBook) {
    const pdfMap: Record<string, string> = {
      'ciencia-datos': 'assets/read/cienciadedatos.pdf',
      'ingenieria-soft': 'assets/read/software.pdf',
      'produccion-patrones': 'assets/read/patrones.pdf',
    };

    const url = pdfMap[book.id];
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.click();
    }
  }

  goBack() {
    this.router.navigateByUrl('/home-user');
  }
}
