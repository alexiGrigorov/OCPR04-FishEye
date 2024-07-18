import FishEyeDataProvider from "../addapters/FishEyeDataProvider.mjs";
import PhotographerHeader from "../templates/PhotographerHeader.mjs";

class Photographer {
  #photographer;
  #dataProvider;
  #photographerHeader;

  constructor() {
    const photographerId = new URLSearchParams(window.location.search).get(
      "id"
    );
    if (! photographerId) {
      window.location.replace("./");
    }
    this.#dataProvider = new FishEyeDataProvider();
    const photographers = await this.#dataProvider.getPhotographers();
    const photographer = photographers.find(
      (photographer) => photographer.id === photographerId
    );
    this.#photographerHeader = new PhotographerHeader();
  }
  init() {
    this.#photographerHeader.render(this.#photographer);
  }
}

const photographer = new Photographer();
photographer.init();
