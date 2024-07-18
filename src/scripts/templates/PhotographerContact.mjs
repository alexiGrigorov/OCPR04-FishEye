export default class PhotographerContact {
  static #template = document.getElementById("photographer-contact-template");

  #data;
  #photographerContactFilledTemplate;
  #photographerContactElement;

  id;

  constructor(data) {
    this.#data = data;
    this.id = data.id;
    const filledTemplate =
      PhotographerContact.#template.content.cloneNode(true);

    //   fill the template

    this.#photographerContactFilledTemplate = filledTemplate;
  }

  append() {
    PhotographerContact.#template.parentElement.append(
      this.#photographerContactFilledTemplate.cloneNode(true)
    );
    this.#photographerContactElement =
      PhotographerContact.#template.parentElement.lastElementChild;
  }

  remove() {
    this.#photographerContactElement.remove();
  }
}
