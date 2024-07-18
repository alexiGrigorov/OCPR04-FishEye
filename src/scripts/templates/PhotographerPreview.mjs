export default class PhotographerPreview {
  static #template = document.getElementById("photographer-preview-template");

  #data;
  #photographerPreveiwFilledTemplate;
  #photographerPreveiwElement;

  id;

  constructor(data) {
    this.#data = data;
    this.id = data.id;
    const filledTemplate =
      PhotographerPreview.#template.content.cloneNode(true);

    const link = filledTemplate.getElementById("link");
    link.href += `?id=${this.#data.id}`;
    link.removeAttribute("id");

    const portrait = filledTemplate.getElementById("portrait");
    portrait.src = this.#data.portrait;
    portrait.alt = this.#data.name;
    portrait.removeAttribute("id");

    const name = filledTemplate.getElementById("name");
    name.textContent = this.#data.name;
    name.removeAttribute("id");

    const location = filledTemplate.getElementById("location");
    location.textContent = this.#data.location;
    location.removeAttribute("id");

    const tagline = filledTemplate.getElementById("tagline");
    tagline.textContent = this.#data.tagline;
    tagline.removeAttribute("id");

    const price = filledTemplate.getElementById("price");
    price.textContent = this.#data.price;
    price.removeAttribute("id");

    this.#photographerPreveiwFilledTemplate = filledTemplate;
  }

  append() {
    PhotographerPreview.#template.parentElement.append(
      this.#photographerPreveiwFilledTemplate.cloneNode(true)
    );
    this.#photographerPreveiwElement =
      PhotographerPreview.#template.parentElement.lastElementChild;
  }

  remove() {
    this.#photographerPreveiwElement.remove();
  }
}
