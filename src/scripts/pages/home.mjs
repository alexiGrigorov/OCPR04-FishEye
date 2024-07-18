import DBService from "../api/DBService.mjs";
import FeaturedPhotographers from "../containers/FeaturedPhotographers.mjs";

class Home {
  #dataProvider;
  #featuredPhotographers;

  constructor(dataProvider, featuredPhotographers) {
    this.#dataProvider = dataProvider;
    this.#featuredPhotographers = featuredPhotographers;
  }
  async init() {
    // Récupère les datas des photographes
    const photographers = await this.#dataProvider.getPhotographers();
    this.#featuredPhotographers.init(photographers);
    this.#featuredPhotographers.displayPhotographers();
  }
}

const home = new Home(new DBService(), new FeaturedPhotographers());
home.init();
