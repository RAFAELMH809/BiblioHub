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

const LS_KEY = 'bh.user';

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  private _profile$ = new BehaviorSubject<UserProfile | null>(null);
  profile$ = this._profile$.asObservable();

  constructor() {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try { this._profile$.next(JSON.parse(raw)); } catch {}
    }
  }

  private save(p: UserProfile | null) {
    if (p) localStorage.setItem(LS_KEY, JSON.stringify(p));
    else   localStorage.removeItem(LS_KEY);
    this._profile$.next(p);
  }

  get profile(): UserProfile | null { return this._profile$.value; }
  get isLoggedIn(): boolean { return !!this.profile; }

  /** Login/Signup “fake”: si no hay perfil, lo crea; si hay, lo actualiza. */
  login(name: string, email?: string) {
    const now = Date.now();
    const existing = this.profile;
    const base: UserProfile = existing ?? {
      id: crypto?.randomUUID?.() || String(now),
      name, email, createdAt: now,
      info: { rol:null, nivel:null, area:null, objetivo:null, tiempo:null },
      genres: [],
    };
    base.name = name || base.name;
    if (email) base.email = email;
    this.save(base);
  }

  logout() { this.save(null); }

  /** Guarda bloques del formulario “Cuéntanos sobre ti” */
  patchInfo(info: Partial<OnboardingInfo>) {
    const p = this.profile; if (!p) return;
    p.info = { ...p.info, ...info };
    this.save(p);
  }

  setGenres(genres: string[]) {
    const p = this.profile; if (!p) return;
    p.genres = genres;
    this.save(p);
  }
}
