export default class PhotographerPreview {
  static #template = document.getElementById("photographer-preview-template");
  #photographerPreveiwFilledTemplate;

  data;
  element;

  constructor(photographerData) {
    this.data = photographerData;
    this.id = this.data.id;
    const filledTemplate =
      PhotographerPreview.#template.content.cloneNode(true);

    for (const key in this.data) {
      if (key !== "portrait" && key !== "id") {
        const elements = Array.from(
          filledTemplate.querySelectorAll(`.template-${key}`)
        );
        elements.forEach((element) => {
          element.textContent = this.data[key];
          element.classList.remove(`template-${key}`);
        });
      }
    }

    const portrait = filledTemplate.querySelector(".template-portrait");
    portrait.src = this.data.portrait;
    portrait.alt = this.data.name;
    portrait.classList.remove("template-portrait");

    const link = filledTemplate.querySelector(".template-link");
    link.href += `?id=${this.data.id}`;
    link.classList.remove("template-link");

    this.#photographerPreveiwFilledTemplate = filledTemplate;
  }

  append() {
    PhotographerPreview.#template.parentElement.append(
      this.#photographerPreveiwFilledTemplate
    );
    this.element = PhotographerPreview.#template.parentElement.lastElementChild;
  }

  remove() {
    this.element.remove();
  }
}
