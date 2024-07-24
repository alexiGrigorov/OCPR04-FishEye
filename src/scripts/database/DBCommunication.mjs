export default class DBCommunication {
  #url;

  constructor(url) {
    this.#url = url;
  }

  async getData() {
    let data;

    try {
      const response = await fetch(this.#url);
      data = await response.json();
    } catch (error) {
      throw new Error(error);
    }

    return data;
  }
}
