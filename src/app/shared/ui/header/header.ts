import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  // ⬇️ IMPORTANTE: habilita routerLink y (opcional) routerLinkActive
  imports: [RouterLink],
})
export class HeaderComponent {}
