export default class PhotographerPreview {
  static #template = document.getElementById("photographer-preview-template");

  #data;
  #photographerPreveiwElement;

  constructor(data) {
    this.#data = data;
    this.#photographerPreveiwElement =
      PhotographerPreview.#template.content.cloneNode(true);

    const link = this.#photographerPreveiwElement.getElementById("link");
    link.href += `?id=${this.#data.id}`;
    link.removeAttribute("id");

    const portrait =
      this.#photographerPreveiwElement.getElementById("portrait");
    portrait.src = this.#data.portrait;
    portrait.alt = this.#data.name;
    portrait.removeAttribute("id");

    const name = this.#photographerPreveiwElement.getElementById("name");
    name.textContent = this.#data.name;
    name.removeAttribute("id");

    const location =
      this.#photographerPreveiwElement.getElementById("location");
    location.textContent = this.#data.location;
    location.removeAttribute("id");

    const tagline = this.#photographerPreveiwElement.getElementById("tagline");
    tagline.textContent = this.#data.tagline;
    tagline.removeAttribute("id");

    const price = this.#photographerPreveiwElement.getElementById("price");
    price.textContent = this.#data.price;
    price.removeAttribute("id");
  }

  appendTo(parentElement) {
    parentElement.append(this.#photographerPreveiwElement);
  }
}
