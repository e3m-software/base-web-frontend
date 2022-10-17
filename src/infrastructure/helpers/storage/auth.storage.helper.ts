import { AppStorage } from './storage.adapter.helper';

type AccountEntity = any;

export interface IAuthHelper {
  setAccount(account: AccountEntity): void;
  updateAccount(account: AccountEntity): void;
  getAccount(): AccountEntity;
  clearAccount(): void;
  getAuthToken(): string;
  clearStorageLogout(keys?: string[]): void;
}

export class BaseAuthHelper implements IAuthHelper {
  private authKey = 'account';
  private storage = new AppStorage();

  public encode(obj: AccountEntity): string {
    if (!obj) return '';
    return window.btoa(JSON.stringify(obj));
  }
  public decode(str: string): AccountEntity {
    if (!str) return undefined;
    return JSON.parse(window.atob(str));
  }

  setAccount(account: any): void {
    this.storage.setItem(this.authKey, this.encode(account));
  }

  updateAccount(account: any): void {
    const existAccount = this.getAccount();
    Object.assign(existAccount, {
      ...(account ?? {}),
    });
    this.storage.setItem(this.authKey, this.encode(existAccount));
  }

  getAccount() {
    return this.decode(this.storage.getItem(this.authKey));
  }

  clearAccount(): void {
    this.storage.removeItem(this.authKey);
  }

  getAuthToken(): string {
    const account = this.getAccount();
    return account?.access_token ?? account?.accessToken ?? account?.token;
  }

  clearStorageLogout(keys?: string[]): void {
    const removedKey = [this.authKey, ...(keys ?? [])];
    removedKey.forEach(item => {
      this.storage.removeItem(item);
    });
  }
}

export const authHelper = new BaseAuthHelper();
