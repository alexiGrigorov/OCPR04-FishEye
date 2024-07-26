export default class ModalContainerService {
  #dialogElement;
  #openModalButton;
  #closeModalButton;

  constructor(dialogElement, openModalButton) {
    this.#dialogElement = dialogElement;
    this.#openModalButton = openModalButton;

    const closeModalButton = dialogElement.querySelector("#close-modal-button");
    closeModalButton.removeAttribute("id");
    this.#closeModalButton = closeModalButton;

    this.#openModalButton.addEventListener("click", () =>
      this.#dialogElement.showModal()
    );
    this.#closeModalButton.addEventListener("click", () =>
      this.#dialogElement.close()
    );
  }

  showModal() {
    this.#dialogElement.showModal();
  }

  closeModal() {
    this.#dialogElement.close();
  }
}
