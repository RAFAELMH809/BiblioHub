import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type OnboardingInfo = {
  rol?: string | null;
  nivel?: string | null;
  area?: string | null;
  objetivo?: string | null;
  tiempo?: string | null;
};

export type UserProfile = {
  id: string;
  name: string;
  email?: string;
  createdAt: number;
  info: OnboardingInfo;
  genres: string[];        // slugs: ['educacion','ingenieria',...]
};

// "BD" local de usuarios y sesión actual
const USERS_KEY = 'bh.users';
const CURRENT_EMAIL_KEY = 'bh.currentEmail';

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  private _profile$ = new BehaviorSubject<UserProfile | null>(null);
  profile$ = this._profile$.asObservable();

  private users: UserProfile[] = [];

  constructor() {
    // Cargar lista de usuarios guardados
    const rawUsers = localStorage.getItem(USERS_KEY);
    if (rawUsers) {
      try {
        this.users = JSON.parse(rawUsers) ?? [];
      } catch {
        this.users = [];
      }
    }

    // Cargar usuario actualmente logueado (si lo hay)
    const currentEmail = localStorage.getItem(CURRENT_EMAIL_KEY);
    if (currentEmail) {
      const u = this.findByEmail(currentEmail);
      if (u) {
        this._profile$.next(u);
      }
    }
  }

  get profile(): UserProfile | null {
    return this._profile$.value;
  }

  get isLoggedIn(): boolean {
    return !!this.profile;
  }

  /* ========== HELPERS INTERNOS ========== */

  private findByEmail(email: string): UserProfile | undefined {
    const e = email.toLowerCase();
    return this.users.find((u) => u.email?.toLowerCase() === e);
  }

  private saveUsers() {
    localStorage.setItem(USERS_KEY, JSON.stringify(this.users));
    const p = this._profile$.value;
    if (p?.email) {
      localStorage.setItem(CURRENT_EMAIL_KEY, p.email);
    } else {
      localStorage.removeItem(CURRENT_EMAIL_KEY);
    }
  }

  private updateCurrentUser(newProfile: UserProfile) {
    this._profile$.next(newProfile);
    const idx = this.users.findIndex((u) => u.id === newProfile.id);
    if (idx !== -1) {
      this.users[idx] = { ...newProfile };
    } else {
      this.users.push({ ...newProfile });
    }
    this.saveUsers();
  }

  /* ========== SIGNUP / LOGIN / LOGOUT ========== */

  /** Crear cuenta nueva. Devuelve error si el correo ya existe. */
  signup(name: string, email: string):
    | { ok: true; user: UserProfile }
    | { ok: false; reason: 'email_exists' } {
    const trimmedEmail = email.trim().toLowerCase();
    if (this.findByEmail(trimmedEmail)) {
      return { ok: false, reason: 'email_exists' };
    }

    const now = Date.now();
    const user: UserProfile = {
      id: (crypto as any)?.randomUUID?.() || String(now),
      name: name.trim() || 'Usuario BiblioHub',
      email: trimmedEmail,
      createdAt: now,
      info: { rol: null, nivel: null, area: null, objetivo: null, tiempo: null },
      genres: [],
    };

    this.users.push(user);
    this._profile$.next(user);
    this.saveUsers();

    return { ok: true, user };
  }

  /** Iniciar sesión con un correo que ya debe existir. */
  signin(email: string):
    | { ok: true; user: UserProfile }
    | { ok: false; reason: 'not_found' } {
    const trimmedEmail = email.trim().toLowerCase();
    const user = this.findByEmail(trimmedEmail);
    if (!user) {
      return { ok: false, reason: 'not_found' };
    }

    this._profile$.next(user);
    this.saveUsers();
    return { ok: true, user };
  }

  /** Cerrar sesión (no borra el usuario de la "BD", solo la sesión activa). */
  logout() {
    this._profile$.next(null);
    localStorage.removeItem(CURRENT_EMAIL_KEY);
  }

  /* ========== ONBOARDING: INFO + GÉNEROS ========== */

  /** Guarda bloques del formulario “Cuéntanos sobre ti” */
  patchInfo(info: Partial<OnboardingInfo>) {
    const p = this.profile;
    if (!p) return;

    p.info = { ...p.info, ...info };
    this.updateCurrentUser(p);
  }

  /** Actualiza géneros favoritos */
  setGenres(genres: string[]) {
    const p = this.profile;
    if (!p) return;

    p.genres = genres;
    this.updateCurrentUser(p);
  }
}
