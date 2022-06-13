import { route } from 'preact-router';
export class AppStore {
  static get(key) {
    if (!window.localStorage.length){
      route(`/`);
    }
    if (!window.localStorage.getItem(key)  || window.localStorage.getItem(key) !== "undefined") {
      return JSON.parse(window.localStorage.getItem(key) || '{}');
    } else {
      return JSON.parse('{}');
    }
  }
  static set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  static remove(key) {
    window.localStorage && window.localStorage.removeItem(key);
  }
  static removeAll() {
    window.localStorage && window.localStorage.clear();
  }
}
