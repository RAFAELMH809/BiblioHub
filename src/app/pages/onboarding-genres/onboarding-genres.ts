import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-onboarding-genres',
  standalone: true,
  imports: [NgFor],
  templateUrl: './onboarding-genres.html',
  styleUrls: ['./onboarding-genres.scss'],
})
export class OnboardingGenresComponent {
  generos = ['Educación','Salud','Cultural','Ingeniería','Religión','Gastronomía','Tecnologías','Negocios','Historia','Ciencias','Matemáticas','Arte'];
}
