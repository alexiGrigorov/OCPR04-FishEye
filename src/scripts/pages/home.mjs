import FishEyeDataProvider from "../addapters/FishEyeDataProvider.mjs";
import FeaturedPhotographers from "../containers/FeaturedPhotographers.mjs";

class Home {
  #dataProvider;
  #featuredPhotographers;

  constructor() {
    this.#dataProvider = new FishEyeDataProvider();
    this.#featuredPhotographers = new FeaturedPhotographers();
  }
  async init() {
    const photographers = await this.#dataProvider.getPhotographers();
    photographers.forEach((photographer) => {
      this.#featuredPhotographers.addPhotographer(photographer);
    });
  }
}

const home = new Home();
home.init();
