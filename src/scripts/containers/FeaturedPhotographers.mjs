import PhotographerPreview from "../templates/PhotographerPreview.mjs";

export default class FeaturedPhotographers {
  static #featuredPhotographersElement = document.getElementById(
    "featured-photographers"
  );

  #photographersData;
  #photographersPreviews = [];

  constructors() {}

  init(photographersData) {
    this.#photographersData = photographersData;
    this.#photographersData.forEach((photographerData) =>
      this.#photographersPreviews.push(
        new PhotographerPreview(photographerData)
      )
    );
  }

  displayPhotographers() {
    this.#photographersPreviews.forEach((photographerPreview) =>
      photographerPreview.appendTo(
        FeaturedPhotographers.#featuredPhotographersElement
      )
    );
  }
}
