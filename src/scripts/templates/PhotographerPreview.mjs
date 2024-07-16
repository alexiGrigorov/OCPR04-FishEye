export default class PhotographerPreview {
  static #template = document.getElementById("photographer-preview-template");

  #data;
  #photographerPreveiwElement;

  constructor(data) {
    this.#data = data;
    this.#photographerPreveiwElement =
      PhotographerPreview.#template.content.cloneNode(true);

    this.#photographerPreveiwElement.getElementById("portrait").src =
      this.#data.portrait;
    this.#photographerPreveiwElement.getElementById("portrait").alt =
      this.#data.name;

    this.#photographerPreveiwElement.getElementById("name").textContent =
      this.#data.name;

    this.#photographerPreveiwElement.getElementById("location").textContent =
      this.#data.location;
    this.#photographerPreveiwElement.getElementById("tagline").textContent =
      this.#data.tagline;
    this.#photographerPreveiwElement.getElementById("price").textContent =
      this.#data.price;
  }

  appendTo(parentElement) {
    parentElement.append(this.#photographerPreveiwElement);
  }
}
