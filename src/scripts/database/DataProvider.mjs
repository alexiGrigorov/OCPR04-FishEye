import DBCommunication from "./DBCommunication.mjs";
import LocalSessionCaching from "./LocalSessionCaching.mjs";
import DataModelPhotographer from "../models/DataModelPhotographer.mjs";
import DataModelMediaFactory from "../models/DataModelMedia.mjs";

export default class DataProvider {
  static #singleton;

  #fishEyeDBCommunication;
  #fishEyeLocalSessionCaching;

  constructor() {
    if (DataProvider.#singleton) {
      return DataProvider.#singleton;
    }

    this.#fishEyeDBCommunication = new DBCommunication(
      "./../../../db/photographers.json"
    );
    this.#fishEyeLocalSessionCaching = new LocalSessionCaching("fishEye");
  }

  async #processRawData() {
    this.#fishEyeLocalSessionCaching.clearCache();

    let rawData;
    try {
      rawData = await this.#fishEyeDBCommunication.getData();
    } catch (error) {
      console.error(error);
    }

    const photographers = rawData.photographers.map(
      (photographer) => new DataModelPhotographer(photographer)
    );

    const media = rawData.media.map(
      (media) => new DataModelMediaFactory(media, photographers)
    );

    this.#fishEyeLocalSessionCaching.setCache("photographers", photographers);
    this.#fishEyeLocalSessionCaching.setCache("media", media);
  }

  async refreshData() {
    await this.#processRawData();
  }

  async getPhotographers() {
    if (!this.#fishEyeLocalSessionCaching.isCached("photographers")) {
      await this.#processRawData();
    }

    return this.#fishEyeLocalSessionCaching.getCache("photographers");
  }

  async getMedia() {
    if (!this.#fishEyeLocalSessionCaching.isCached("media")) {
      await this.#processRawData();
    }

    return this.#fishEyeLocalSessionCaching.getCache("media");
  }

  updateMediaLikes(mediaId) {
    const media = this.#fishEyeLocalSessionCaching.getCache("media");
    const mediaToUpdate = media.find((media) => media.id === mediaId);
    mediaToUpdate.likes += 1;

    this.#fishEyeLocalSessionCaching.setCache("media", media);
  }
}
