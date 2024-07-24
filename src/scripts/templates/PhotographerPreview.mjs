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

    for (const key in data) {
      if (key !== "portrait" && key !== "id") {
        const elements = Array.from(
          filledTemplate.querySelectorAll(`.template-${key}`)
        );
        elements.forEach((element) => {
          element.textContent = data[key];
          element.classList.remove(`template-${key}`);
        });
      }
    }

    const portrait = filledTemplate.querySelector(".template-portrait");
    portrait.src = data.portrait;
    portrait.alt = data.name;
    portrait.classList.remove("template-portrait");

    const link = filledTemplate.querySelector(".template-link");
    link.href += `?id=${this.#data.id}`;
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
