export interface AppStorageInterface {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null | undefined;
  removeItem(key: string): void;
  clear(): void;
}

export class AppStorage implements AppStorageInterface {
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  getItem(key: string): string | null | undefined {
    return localStorage.getItem(key);
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  clear(): void {
    localStorage.clear();
  }
}
