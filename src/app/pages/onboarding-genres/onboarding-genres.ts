import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

type Genero = {
  key: string;
  nombre: string;
  icon: string;   // ruta al PNG en assets/generos
  selected?: boolean;
};

@Component({
  selector: 'app-onboarding-genres',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './onboarding-genres.html',
  styleUrls: ['./onboarding-genres.scss'],
})
export class OnboardingGenresComponent {

  // Fondo del mockup (ya lo tienes en assets/generos/fondogenero.jpg)
  bgUrl = 'assets/generos/fondogenero.jpg';

  generos: Genero[] = [
    { key:'educacion',    nombre:'Educación',    icon:'assets/generos/educaciones.png' },
    { key:'salud',        nombre:'Salud',        icon:'assets/generos/saludcategoria.png' },
    { key:'cultura',      nombre:'Cultura',      icon:'assets/generos/culturas.png' },
    { key:'religion',     nombre:'Religión',     icon:'assets/generos/religiones.png' },
    { key:'gastronomia',  nombre:'Gastronomía',  icon:'assets/generos/gastronomias.png' },
    { key:'ingenieria',   nombre:'Ingeniería',   icon:'assets/generos/ingenieria.png' },
    { key:'historia',     nombre:'Historia',     icon:'assets/generos/historia.png' },
    { key:'tecnologias',  nombre:'Tecnologías',  icon:'assets/generos/tecnologias.png' },
    { key:'negocios',     nombre:'Negocios',     icon:'assets/generos/negocios.png' },
    { key:'ciencias',     nombre:'Ciencias',     icon:'assets/generos/ciencia.png' },
    { key:'matematicas',  nombre:'Matematicas',  icon:'assets/generos/matematicas.png' },
    { key:'arte',         nombre:'Arte',         icon:'assets/generos/arte.png' },
  ];

  get countSelected(): number {
    return this.generos.filter(g => g.selected).length;
  }

  toggle(g: Genero) {
    g.selected = !g.selected;
  }

  // Puedes guardar en localStorage para el siguiente paso real
  finalizar() {
    if (this.countSelected < 3) return;
    const seleccion = this.generos.filter(g => g.selected).map(g => g.key);
    localStorage.setItem('onboarding.generos', JSON.stringify(seleccion));
    // de momento te mando al home; cámbialo si quieres otra ruta
    this.router.navigateByUrl('/home');
  }

  constructor(private router: Router) {}
}
