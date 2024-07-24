export default class LocalSessionCaching {
  #serviceUser;

  constructor(serviceUser) {
    this.#serviceUser = serviceUser;
  }

  isCached(key) {
    return sessionStorage.getItem(`${this.#serviceUser}.${key}`) !== null;
  }

  setCache(key, data) {
    sessionStorage.setItem(`${this.#serviceUser}.${key}`, JSON.stringify(data));
  }

  getCache(key) {
    return JSON.parse(sessionStorage.getItem(`${this.#serviceUser}.${key}`));
  }

  removeCache(key) {
    sessionStorage.removeItem(`${this.#serviceUser}.${key}`);
  }

  clearCache() {
    const userStoredItems = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      if (sessionStorage.key(i).startsWith(this.#serviceUser)) {
        userStoredItems.push(sessionStorage.key(i));
      }
    }
    userStoredItems.forEach((key) => {
      sessionStorage.removeItem(key);
    });
  }
}
