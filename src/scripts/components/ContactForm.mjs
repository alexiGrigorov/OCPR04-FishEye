import Modal from "../functions/Modal.mjs";
import Form from "../functions/Form.mjs";

export default class ContactPhotographer {
  #eventCoordinator;
  #eventPrefix;

  #contactButton;
  #modal;
  #form;

  constructor(eventCoordinator, dialog, contactButton) {
    this.#eventCoordinator = eventCoordinator;
    this.#eventPrefix = "contact";

    this.#contactButton = contactButton;
    this.#modal = dialog;
    this.#form = dialog.querySelector("form");
  }

  init() {
    this.#contactButton.addEventListener("click", () =>
      this.#eventCoordinator.emit(`${this.#eventPrefix}-openModal`)
    );
    this.#contactButton.removeAttribute("id");

    new Modal(this.#eventCoordinator, this.#modal);
    new Form(this.#eventCoordinator, this.#form);

    this.#eventCoordinator.subscribe(`${this.#eventPrefix}-formSubmitted`, () =>
      this.#eventCoordinator.emit(`${this.#eventPrefix}-closeModal`)
    );
  }
}
