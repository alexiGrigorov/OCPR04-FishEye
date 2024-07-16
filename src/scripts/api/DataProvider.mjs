import DataModelPhotographer from "../models/Photographer.mjs";
import DataModelMediaFactory from "../models/Media.mjs";

export default class DataProvider {
  static #url = "./../../../db/photographers.json";
  static #singleton;

  #rawData;
  #photographers;
  #medias;

  constructor() {
    if (DataProvider.#singleton) {
      return DataProvider.#singleton;
    }
    DataProvider.#singleton = this;

    if (
      sessionStorage.getItem("rawData") &&
      sessionStorage.getItem("photographers") &&
      sessionStorage.getItem("medias")
    ) {
      this.#rawData = JSON.parse(sessionStorage.getItem("rawData"));
      this.#photographers = JSON.parse(sessionStorage.getItem("photographers"));
      this.#medias = JSON.parse(sessionStorage.getItem("medias"));
      return this;
    }

    this.updateData();
  }

  async #fetchRawData() {
    let rawData;

    try {
      const response = await fetch(DataProvider.#url);
      rawData = await response.json();
    } catch (error) {
      throw new Error(error);
    }

    return rawData;
  }

  #parsePhotographers() {
    const photographers = this.#rawData.photographers.map(
      (photographer) => new DataModelPhotographer(photographer)
    );
    return photographers;
  }

  #parseMedias() {
    const dataModelMediaFactory = new DataModelMediaFactory(
      this.#photographers
    );
    const medias = this.#rawData.media.map((media) =>
      dataModelMediaFactory.create(media)
    );
    return medias;
  }

  async updateData() {
    sessionStorage.clear();
    let fetchedData;

    try {
      fetchedData = await this.#fetchRawData();
    } catch (error) {
      console.error(error);
    }

    // set the instance properties
    this.#rawData = fetchedData;
    this.#photographers = this.#parsePhotographers();
    this.#medias = this.#parseMedias();

    // save them into the session storage
    sessionStorage.setItem("rawData", JSON.stringify(this.#rawData));
    sessionStorage.setItem(
      "photographers",
      JSON.stringify(this.#photographers)
    );
    sessionStorage.setItem("medias", JSON.stringify(this.#medias));
  }

  async getPhotographers() {
    while (!this.#photographers) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return this.#photographers;
  }

  async getMedias() {
    while (!this.#medias) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return this.#medias;
  }
}
