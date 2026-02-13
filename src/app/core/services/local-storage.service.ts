import { Injectable } from '@angular/core';
import { LocalStorageItem } from '@constants';
import { isBrowser } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   * Saves a value to localStorage.
   * @param key Storage key
   * @param value Value to store
   */
  setItem<T>(key: LocalStorageItem, value: T): void {
    if (isBrowser()) {
      try {
        const json = JSON.stringify(value);
        localStorage.setItem(key, json);
      } catch (error) {}
    }
  }

  /**
   * Retrieves a value from localStorage.
   * @param key Storage key
   * @returns Parsed value or null if not found or parsing fails
   */
  getItem<T>(key: LocalStorageItem): T | null {
    if (isBrowser()) {
      try {
        const json = localStorage.getItem(key);
        return json ? (JSON.parse(json) as T) : null;
      } catch (error) {
        return null;
      }
    }

    return null;
  }

  /**
   * Removes an item from localStorage.
   * @param key Storage key
   */
  removeItem(key: string): void {
    if (isBrowser()) {
      localStorage.removeItem(key);
    }
  }

  /**
   * Clears the entire localStorage.
   */
  clear(): void {
    if (isBrowser()) {
      localStorage.clear();
    }
  }

  /**
   * Checks whether a key exists in localStorage.
   * @param key Storage key
   * @returns True if the key exists, false otherwise
   */
  hasKey(key: string): boolean {
    if (isBrowser()) {
      return localStorage.getItem(key) !== null;
    }

    return false;
  }
}
