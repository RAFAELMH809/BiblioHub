import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SearchBook = {
  id: string;
  title: string;
  author: string;
  cover: string;
  shortDescription: string;
  category: string;      // debe coincidir con el value del select
  keywords: string[];    // palabras clave para búsquedas parciales
};

const BOOKS: SearchBook[] = [
  {
    id: 'ciencia-datos',
    title: 'Ciencia de datos',
    author: 'Kelleher & Tierney',
    cover: 'assets/home/categorias/fondos/cienciadatos.png',
    shortDescription:
      'El crecimiento en el uso de la ciencia de datos en nuestras sociedades está impulsado por la aparición del big data y las redes sociales, la aceleración de la potencia informática, la reducción masiva en el costo de la memoria de la computadora y el desarrollo de métodos más potentes para el análisis y modelado de datos, como el aprendizaje profundo. Todos estos factores juntos hacen que nunca haya sido tan fácil para las organizaciones recopilar, almacenar y procesar datos. Al mismo tiempo, estas innovaciones técnicas y la aplicación más amplia de la ciencia de datos hacen que los desafíos éticos relacionados con el uso de datos y la privacidad individual nunca han sido tan apremiantes…',
    category: 'Tecnologías',       // 👈 debe coincidir con el option del select
    keywords: ['ciencia', 'datos', 'data', 'kelleher', 'tierney'],
  },
  {
    id: 'ingenieria-soft',
    title: 'Ingeniería del Software',
    author: 'Ian Sommerville',
    cover: 'assets/home/categorias/fondos/software.png',
    shortDescription:
      'Nueva edición de un clásico de la Ingeniería del Software. Contiene 4 nuevos capítulos de aplicación de arquitecturas, métodos rápidos de desarrollo del software, ingeniería del software orientado a componentes y evolución del software. PARTE 1 Visión general Capítulo 1 Introducción Capítulo 2: Sistemas socio-técnicos Capítulo 3: Sistemas críticos Capítulo 4: Procesos del software Capítulo 5: Gestión de proyectos PARTE 2 Requerimientos Capítulo 6: Requerimientos del software Capítulo 7: Procesos de la ingeniería de requerimientos Capítulo 8: Modelos del sistema Capítulo 9: Especificación de sistemas críticos Capítulo 10: Especificación formal PARTE 3 Diseño Capítulo 11: Diseño arquitectónico Capítulo 12: Arquitecturas de sistemas distribuidos Capítulo 13: Arquitecturas de aplicaciones…',
    category: 'Tecnologías',
    keywords: ['ingeniería', 'software', 'sommerville'],
  },
  {
    id: 'produccion-patrones',
    title: 'Introducción a los patrones de diseño',
    author: 'Oscar J. Blancarte Iturralde',
    cover: 'assets/home/categorias/fondos/patrones.png',
    shortDescription:
      'Hoy en día aprender patrones de diseño no es una cualidad más, si no una obligación. Y es que estudiar y comprender los patrones de diseño nos convierte en un mejor programador/arquitecto y es clave para conseguir una mejor posición en el mundo laboral.Este libro fue creado con la intención de enseñar a sus lectores cómo utilizar los patrones de diseño de una forma clara y simple desde un enfoque práctico y con escenarios del mundo real.Tengo que aceptar que este no es un libro convencional de patrones de diseño debido, principalmente, a que no sigue la misma estructura de las primordiales obras relacionadas con este tema. En su lugar, me quise enfocar en ofrecer una perspectiva del mundo real, en donde el lector pueda aprender a utilizar los patrones de diseño en entornos reales y que…',
    category: 'Tecnologías',
    keywords: ['patrones', 'diseño', 'blancarte'],
  },
];

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  /** último resultado “clásico” (por si lo necesitas) */
  lastResults: SearchBook[] = [];

  /** stream de resultados, para que /results se actualice en vivo */
  private resultsSource = new BehaviorSubject<SearchBook[]>(BOOKS);
  results$ = this.resultsSource.asObservable();

  /** todos los libros */
  getAll(): SearchBook[] {
    return [...BOOKS];
  }

  /**
   * Búsqueda:
   * - case-insensitive
   * - matches parciales
   * - categoría/título/autor se combinan como OR:
   *   si coincide por cualquiera de los tres, entra.
   */
  search(category: string, titleTerm: string, authorTerm: string): SearchBook[] {
    const cat = (category ?? '').trim();
    const title = (titleTerm ?? '').trim().toLowerCase();
    const author = (authorTerm ?? '').trim().toLowerCase();

    // si no hay ningún criterio, NO modificamos nada
    if (!cat && !title && !author) {
      return this.lastResults;
    }

    const results = BOOKS.filter((b) => {
      const bTitle = b.title.toLowerCase();
      const bAuthor = b.author.toLowerCase();
      const bCat = b.category.toLowerCase();

      let match = false;

      // categoría exacta
      if (cat && bCat === cat.toLowerCase()) {
        match = true;
      }

      // título parcial o por keyword
      if (
        title &&
        (bTitle.includes(title) ||
          b.keywords.some((k) => k.toLowerCase().includes(title)))
      ) {
        match = true;
      }

      // autor parcial o por keyword
      if (
        author &&
        (bAuthor.includes(author) ||
          b.keywords.some((k) => k.toLowerCase().includes(author)))
      ) {
        match = true;
      }

      return match;
    });

    this.lastResults = results;
    this.resultsSource.next(results);  // 👈 notifica a ResultsComponent
    return results;
  }
}

