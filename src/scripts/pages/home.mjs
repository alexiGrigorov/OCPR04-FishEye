import DataProvider from "../api/DataProvider.mjs";
import FeaturedPhotographers from "../containers/FeaturedPhotographers.mjs";

class App {
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

const app = new App(new DataProvider(), new FeaturedPhotographers());
app.init();
