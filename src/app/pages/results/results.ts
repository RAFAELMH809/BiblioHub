import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { FavoritesService } from '../../core/services/favorites.service';
import { SearchService, SearchBook } from '../../core/services/search.service';

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
    private favs: FavoritesService
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
    this.router.navigateByUrl('/home-user');
  }

  isFavorite(id: string) {
    return this.favs.isFavorite(id);
  }

  toggleFavorite(id: string) {
    this.favs.toggle(id);
  }

  leerLibro(book: SearchBook) {
    this.router.navigate(['/reader', book.id]);
  }

  descargar(book: SearchBook) {
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
