import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { OnboardingInfoComponent } from './pages/onboarding-info/onboarding-info';
import { BookDetailComponent } from './pages/book-detail/book-detail';
import { ReaderComponent } from './pages/reader/reader';
import { FavoritesComponent } from './pages/favorites/favorites';
import { ProfileComponent } from './pages/profile/profile';
import { HomeUserComponent } from './pages/home-user/home-user';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  { path: 'home', component: HomeComponent },
  { path: 'home-user', component: HomeUserComponent },

  { path: 'auth', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // 👇 corregido
  { path: 'onboarding-info', component: OnboardingInfoComponent },

  { path: 'book/:id', component: BookDetailComponent },
  { path: 'reader/:id', component: ReaderComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'profile', component: ProfileComponent },

  { path: '**', redirectTo: 'home' },
];
