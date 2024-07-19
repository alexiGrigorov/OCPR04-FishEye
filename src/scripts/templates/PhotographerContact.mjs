import ModalContainerService from "../services/ModalContainerService.mjs";

export default class PhotographerContact {
  static #template = document.getElementById("photographer-contact-template");

  #data;
  #photographerContactFilledTemplate;
  #photographerContactElement;

  #ModalContainerService;

  id;

  constructor(data) {
    this.#data = data;
    this.id = data.id;
    const filledTemplate =
      PhotographerContact.#template.content.cloneNode(true);

    const modal = filledTemplate.getElementById("modal");
    const openModalButton = filledTemplate.getElementById("open-modal-button");
    this.#ModalContainerService = new ModalContainerService(
      modal,
      openModalButton
    );
    modal.removeAttribute("id");
    openModalButton.removeAttribute("id");

    const name = filledTemplate.getElementById("name");
    name.textContent = this.#data.name;
    name.removeAttribute("id");

    this.#photographerContactFilledTemplate = filledTemplate;
  }

  append() {
    PhotographerContact.#template.parentElement.append(
      this.#photographerContactFilledTemplate
    );
    this.#photographerContactElement =
      PhotographerContact.#template.parentElement.lastElementChild;
  }

  remove() {
    this.#photographerContactElement.remove();
  }
}
