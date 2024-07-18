import PhotographerPreview from "../templates/PhotographerPreview.mjs";

export default class FeaturedPhotographers {
  static #featuredPhotographersElement = document.getElementById(
    "featured-photographers"
  );

  #featuredPhotographers = [];

  constructors() {}

  addPhotographer(photographerData) {
    const featuredPhotographer = new PhotographerPreview(photographerData);
    this.#featuredPhotographers.push(featuredPhotographer);
    featuredPhotographer.appendTo(
      FeaturedPhotographers.#featuredPhotographersElement
    );
  }

  removePhotographer(id) {
    const photographer = this.#featuredPhotographers.find(
      (photographer) => photographer.id === id
    );

    if (!photographer) {
      throw new Error(`Photographer with id ${id} not found`);
    }

    const index = this.#featuredPhotographers.indexOf(photographer);
    this.#featuredPhotographers.splice(index, 1);

    photographer.remove();
  }
}
