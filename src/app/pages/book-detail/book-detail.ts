import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.scss'],
})
export class BookDetailComponent {}
