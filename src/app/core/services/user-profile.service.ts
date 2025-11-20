import { Injectable } from '@angular/core';

export interface UserProfile {
  nombre: string;
  email: string;
  generos: string[];

  // Datos opcionales que vienen del onboarding
  rol?: string;
  nivel?: string;
  area?: string;
  objetivo?: string;
  tiempo?: string;
}

const STORAGE_KEY = 'bh_user_profile';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  /** Devuelve el perfil o null si no hay nada guardado */
  getProfile(): UserProfile | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as UserProfile) : null;
    } catch {
      return null;
    }
  }

  /** Guarda/actualiza el perfil */
  saveProfile(profile: UserProfile): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }

  /** ¿Hay alguien “logueado”? */
  isLoggedIn(): boolean {
    return this.getProfile() !== null;
  }

  /** “Cerrar sesión” */
  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
