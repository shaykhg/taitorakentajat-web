import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * LocalStorage service to be used as a helper in angular projects
 */
export class LocalStorageService {

  constructor() { }

  /**
   * Set boolean in localstorage
   * @param key Key of the item
   * @param value Value of the boolean
   */
  setBoolean(key, value): void {
    localStorage.setItem(key, value.toString());
  }

  /**
   * Get boolean from local storage
   * @param key Key of the stored item
   */
  getBoolean(key): boolean {
   return localStorage.getItem(key) === 'true';
  }

  /**
   * Set string item in local storage
   * @param key key of item
   * @param value value of item in local storage
   */
  setItem(key, value): void {
    return localStorage.setItem(key, value);
  }

  /**
   * Get string item from local storage
   * @param key Key of item
   */
  getItem(key): string {
    return localStorage.getItem(key);
  }

  /**
   * To set the js object in localstorage
   * @param key key of the object
   * @param obj Value of the object
   */
  setObject(key, obj: any): void {
    const value = JSON.stringify(obj);
    localStorage.setItem(key, value);
  }

  /**
   * Get object from local storage
   * @param key Key of the object
   */
  getObject(key: string): any {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  }

  /**
   * Set a number in local storage
   * @param key Key of the number needs to be stored
   * @param value Value of the number
   */
  setNumber(key: string, value: number): void {
    if (isNaN(value)){
      console.log('Not a number!');
      return;
    }
    localStorage.setItem(key, value.toString());
  }

  /**
   * Get a number from local storage
   * @param key Key of the number
   */
  getNumber(key): number {
    const value = localStorage.getItem(key);
    return isNaN(+value) ? 0 : +value;
  }


  /**
   * Remove item from localstorage
   * @param  key of the item to be removed
   */
  removeItem(key: string): void{
    localStorage.removeItem(key);
  }

  /**
   * Flush everything from localstorage, use with CAUTION
   */
  flushStorage(): void{
    localStorage.clear();
  }

}
