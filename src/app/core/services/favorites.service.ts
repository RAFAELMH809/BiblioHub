// src/app/services/favorites.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private storageKey = 'bibliohub_favs';
  private favs = new Set<string>();

  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        const ids: string[] = JSON.parse(saved);
        ids.forEach((id) => this.favs.add(id));
      } catch {
        localStorage.removeItem(this.storageKey);
      }
    }
  }

  isFavorite(id: string): boolean {
    return this.favs.has(id);
  }

  toggle(id: string): void {
    if (this.favs.has(id)) {
      this.favs.delete(id);
    } else {
      this.favs.add(id);
    }
    this.save();
  }

  getAllIds(): string[] {
    return Array.from(this.favs);
  }

  private save() {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(Array.from(this.favs))
    );
  }
}
