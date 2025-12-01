import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { FavoritesService } from '../../core/services/favorites.service';
import { SearchService, SearchBook } from '../../core/services/search.service';
import { UserStoreService } from '../../core/user-store.service';


@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './results.html',
  styleUrls: ['./results.scss'],
})
export class ResultsComponent implements OnInit, OnDestroy {
  books: SearchBook[] = [];
  private sub?: Subscription;

  constructor(
    private router: Router,
    private searchService: SearchService,
    private favs: FavoritesService,
    private userStore: UserStoreService   // 👈 nuevo

  ) {
    // primer render: usamos lo último que haya, o todos
    this.books = this.searchService.lastResults.length
      ? this.searchService.lastResults
      : this.searchService.getAll();
  }

  ngOnInit() {
    // cualquier nueva búsqueda actualiza la lista, incluso estando ya en /results
    this.sub = this.searchService.results$.subscribe((res) => {
      this.books = res ?? [];
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  goBack() {
  if (this.userStore.isLoggedIn) {
    // Usuario logueado → lo mandas a su home de usuario
    this.router.navigateByUrl('/home-user');
  } else {
    // Invitado → lo mandas al home público
    this.router.navigateByUrl('/home');
  }
}


  isFavorite(id: string) {
    return this.favs.isFavorite(id);
  }

  toggleFavorite(id: string) {
    this.favs.toggle(id);
  }

  leerLibro(book: SearchBook) {
  if (!this.userStore.isLoggedIn) {
    alert('Debes iniciar sesión o crear una cuenta para leer un libro.'); // aquí luego podemos poner un modal bonito
    // Si quieres, también puedes mandarlo directo al login:
    // this.router.navigate(['/login']);
    return;
  }

  // Si sí está logueado, navega normal al reader
  this.router.navigate(['/reader', book.id]);
}


 descargar(book: SearchBook) {
  if (!this.userStore.isLoggedIn) {
    alert('Debes iniciar sesión o crear una cuenta para descargar un libro.');
    // Opcional:
    // this.router.navigate(['/login']);
    return;
  }

  const pdfMap: Record<string, string> = {
    'ciencia-datos': 'assets/read/cienciadedatos.pdf',
    'ingenieria-soft': 'assets/read/software.pdf',
    'produccion-patrones': 'assets/read/patrones.pdf',
  };

  const url = pdfMap[book.id];
  if (url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${book.title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

}
