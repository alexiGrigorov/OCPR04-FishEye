export default class Modal {
  #eventCoordinator;
  #eventPrefix;

  #dialogElement;
  #closeModalButton;

  constructor(eventCoordinator, dialogElement) {
    this.#eventCoordinator = eventCoordinator;
    this.#eventPrefix = dialogElement.classList[0].split("-")[0];

    this.#dialogElement = dialogElement;

    const closeModalButton = dialogElement.querySelector("#close-modal-button");
    closeModalButton.removeAttribute("id");
    this.#closeModalButton = closeModalButton;

    this.#closeModalButton.addEventListener("click", () => this.closeModal());

    this.#eventCoordinator.subscribe(`${this.#eventPrefix}-openModal`, () =>
      this.showModal()
    );
    this.#eventCoordinator.subscribe(`${this.#eventPrefix}-closeModal`, () =>
      this.closeModal()
    );
  }

  showModal() {
    this.#dialogElement.showModal();
  }

  closeModal() {
    this.#dialogElement.close();
  }
}
