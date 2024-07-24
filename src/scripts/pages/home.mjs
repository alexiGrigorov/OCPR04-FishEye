import DataProvider from "../database/DataProvider.mjs";
import DynamicElementCreator from "../templates/DynamicElementCreator.mjs";
import PhotographerPreview from "../templates/PhotographerPreview.mjs";

class Home {
  #dataProvider;
  // #featuredPhotographers;

  constructor() {
    this.#dataProvider = new DataProvider();
  }
  async init() {
    const photographers = await this.#dataProvider.getPhotographers();
    // this.#featuredPhotographers =
    new DynamicElementCreator(PhotographerPreview, photographers).elements;
  }
}

const homePage = new Home();
homePage.init();
