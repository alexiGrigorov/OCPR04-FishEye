import FishEyeDataProvider from "../api/FishEyeDataProvider.mjs";
import PhotographerDetails from "../containers/PhotographerDetails.mjs";

class Photographer {
  #photographerId;
  #dataProvider;
  #photographerDetails;

  constructor() {
    this.#photographerId = Number.parseInt(
      new URLSearchParams(window.location.search).get("id")
    );
    if (!this.#photographerId) {
      window.location.replace("./");
    }
    this.#dataProvider = new FishEyeDataProvider();
    this.#photographerDetails = new PhotographerDetails();
  }

  async init() {
    const photographers = await this.#dataProvider.getPhotographers();
    const photographer = photographers.find(
      (photographer) => photographer.id === this.#photographerId
    );
    this.#photographerDetails.init(photographer);
  }
}

const photographerPage = new Photographer();
photographerPage.init();
