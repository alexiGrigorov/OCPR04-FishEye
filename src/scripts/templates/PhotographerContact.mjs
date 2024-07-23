import ModalContainerService from "../services/ModalContainerService.mjs";
import FormService from "../services/FormService.mjs";
import EventEmitterService from "../services/EventEmitterService.mjs";

export default class PhotographerContact {
  static #template = document.getElementById("photographer-contact-template");

  #data;
  #photographerContactFilledTemplate;
  #photographerContactElement;

  #contactModalContainerService;
  #contactEventEmitterService;
  #contactFormService;

  id;

  constructor(data) {
    this.#data = data;
    this.id = data.id;
    const filledTemplate =
      PhotographerContact.#template.content.cloneNode(true);

    this.#contactEventEmitterService = new EventEmitterService();

    const modal = filledTemplate.getElementById("modal");
    const openModalButton = filledTemplate.getElementById("open-modal-button");
    this.#contactModalContainerService = new ModalContainerService(
      modal,
      openModalButton
    );
    modal.removeAttribute("id");
    openModalButton.removeAttribute("id");

    const form = filledTemplate.getElementById("form");
    this.#contactFormService = new FormService(
      form,
      this.#contactEventEmitterService
    );
    form.removeAttribute("id");

    const name = filledTemplate.getElementById("name");
    name.textContent = this.#data.name;
    name.removeAttribute("id");

    this.#photographerContactFilledTemplate = filledTemplate;

    this.#contactFormService.validFormEvent = "validForm";
    this.#contactEventEmitterService.subscribe("validForm", () =>
      this.#contactModalContainerService.closeModal()
    );
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
