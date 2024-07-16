import DataModelPhotographer from "../models/DataModelPhotographer.js";
import DataModelMediaFactory from "../models/DataModelMediaFactory.js";

export default class DataProvider {
  #rawData;
  #photographers;
  #medias;

  constructor(url) {
    this.url = url;
    this.#rawData = sessionStorage.getItem("rawData")
      ? JSON.parse(sessionStorage.getItem("rawData"))
      : this.#fetchRawData();
    this.#photographers = sessionStorage.getItem("photographers")
      ? JSON.parse(sessionStorage.getItem("photographers"))
      : this.#parsePhotographers();
    this.#medias = sessionStorage.getItem("medias")
      ? JSON.parse(sessionStorage.getItem("medias"))
      : this.#parseMedias();
  }

  async #fetchRawData() {
    try {
      const response = await fetch(this.url);
      const rawData = await response.json();
      sessionStorage.setItem("rawData", JSON.stringify(rawData));
      return rawData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async #parsePhotographers() {
    const rawData = await this.#rawData;
    const photographers = rawData.photographers.map(
      (photographer) => new DataModelPhotographer(photographer)
    );
    sessionStorage.setItem("photographers", JSON.stringify(photographers));
    return photographers;
  }

  async #parseMedias() {
    // Ensures that both promises resolve in parallel rather than sequentially
    const [rawData, photographers] = await Promise.all([
      this.#rawData,
      this.#photographers,
    ]);

    const dataModelMediaFactory = new DataModelMediaFactory(photographers);
    const medias = rawData.media.map((media) =>
      dataModelMediaFactory.create(media)
    );
    sessionStorage.setItem("medias", JSON.stringify(medias));
    return medias;
  }

  get photographers() {
    return new Promise((resolve) => resolve(this.#photographers));
  }

  get medias() {
    return new Promise((resolve) => resolve(this.#medias));
  }
}
