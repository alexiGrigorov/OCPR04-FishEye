export default class PhotographerPortrait {
  static #template = document.getElementById("photographer-portrait-template");

  #data;
  #photographerPortraitFilledTemplate;
  #photographerPortraitElement;

  id;

  constructor(data) {
    this.#data = data;
    this.id = data.id;
    const filledTemplate =
      PhotographerPortrait.#template.content.cloneNode(true);

    const portrait = filledTemplate.getElementById("portrait");
    portrait.src = this.#data.portrait;
    portrait.alt = this.#data.name;
    portrait.removeAttribute("id");

    this.#photographerPortraitFilledTemplate = filledTemplate;
  }

  append() {
    PhotographerPortrait.#template.parentElement.append(
      this.#photographerPortraitFilledTemplate
    );
    this.#photographerPortraitElement =
      PhotographerPortrait.#template.parentElement.lastElementChild;
  }

  remove() {
    this.#photographerPortraitElement.remove();
  }
}
