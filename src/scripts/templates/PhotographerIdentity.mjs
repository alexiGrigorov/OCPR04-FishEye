export default class PhotographerIdentity {
  static #template = document.getElementById("photographer-identity-template");

  #data;
  #photographerIdentityFilledTemplate;
  #photographerIdentityElement;

  id;

  constructor(data) {
    this.#data = data;
    this.id = data.id;
    const filledTemplate =
      PhotographerIdentity.#template.content.cloneNode(true);

    const name = filledTemplate.getElementById("name");
    name.textContent = this.#data.name;
    name.removeAttribute("id");

    const location = filledTemplate.getElementById("location");
    location.textContent = this.#data.location;
    location.removeAttribute("id");

    const tagline = filledTemplate.getElementById("tagline");
    tagline.textContent = this.#data.tagline;
    tagline.removeAttribute("id");

    this.#photographerIdentityFilledTemplate = filledTemplate;
  }

  append() {
    PhotographerIdentity.#template.parentElement.append(
      this.#photographerIdentityFilledTemplate.cloneNode(true)
    );
    this.#photographerIdentityElement =
      PhotographerIdentity.#template.parentElement.lastElementChild;
  }

  remove() {
    this.#photographerIdentityElement.remove();
  }
}
