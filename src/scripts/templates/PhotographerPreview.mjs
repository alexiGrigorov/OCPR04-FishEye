export default class PhotographerPreview {
  static #template = document.getElementById("photographer-preview-template");

  #photographerData;
  #photographerPreveiwFilledTemplate;
  #photographerPreveiwElement;

  id;

  constructor(photographerData) {
    this.#photographerData = photographerData;
    this.id = this.#photographerData.id;
    const filledTemplate =
      PhotographerPreview.#template.content.cloneNode(true);

    for (const key in this.#photographerData) {
      if (key !== "portrait" && key !== "id") {
        const elements = Array.from(
          filledTemplate.querySelectorAll(`.template-${key}`)
        );
        elements.forEach((element) => {
          element.textContent = this.#photographerData[key];
          element.classList.remove(`template-${key}`);
        });
      }
    }

    const portrait = filledTemplate.querySelector(".template-portrait");
    portrait.src = this.#photographerData.portrait;
    portrait.alt = this.#photographerData.name;
    portrait.classList.remove("template-portrait");

    const link = filledTemplate.querySelector(".template-link");
    link.href += `?id=${this.#photographerData.id}`;
    link.classList.remove("template-link");

    this.#photographerPreveiwFilledTemplate = filledTemplate;
  }

  append() {
    PhotographerPreview.#template.parentElement.append(
      this.#photographerPreveiwFilledTemplate
    );
    this.#photographerPreveiwElement =
      PhotographerPreview.#template.parentElement.lastElementChild;
  }

  remove() {
    this.#photographerPreveiwElement.remove();
  }
}
