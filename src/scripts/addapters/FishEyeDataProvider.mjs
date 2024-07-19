import DBService from "../api/DBService.mjs";
import CachingService from "../cache/CachingService.mjs";
import DataModelPhotographer from "../models/DataModelPhotographer.mjs";
import DataModelMediaFactory from "../models/DataModelMedia.mjs";

export default class FishEyeDataProvider {
  static #singleton;

  #fishEyeDBService;
  #fishEyeCachingService;

  constructor() {
    if (FishEyeDataProvider.#singleton) {
      return FishEyeDataProvider.#singleton;
    }

    this.#fishEyeDBService = new DBService("./../../../db/photographers.json");
    this.#fishEyeCachingService = new CachingService("fishEye");
  }

  async #processRawData() {
    this.#fishEyeCachingService.clearCache();

    let rawData;
    try {
      rawData = await this.#fishEyeDBService.getData();
    } catch (error) {
      console.error(error);
    }

    const photographers = rawData.photographers.map(
      (photographer) => new DataModelPhotographer(photographer)
    );

    const medias = rawData.media.map(
      (media) => new DataModelMediaFactory(media, photographers)
    );

    this.#fishEyeCachingService.setCache("photographers", photographers);
    this.#fishEyeCachingService.setCache("medias", medias);
  }

  async refreshData() {
    await this.#processRawData();
  }

  async getPhotographers() {
    if (!this.#fishEyeCachingService.isCached("photographers")) {
      await this.#processRawData();
    }

    return this.#fishEyeCachingService.getCache("photographers");
  }

  async getMedias() {
    if (!this.#fishEyeCachingService.isCached("medias")) {
      await this.#processRawData();
    }

    return this.#fishEyeCachingService.getCache("medias");
  }
}
