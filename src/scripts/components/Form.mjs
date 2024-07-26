export default class FormService {
  #formElement;
  #submitButton;
  #eventEmitter;

  constructor(formElement, eventEmitter) {
    this.#formElement = formElement;
    this.#eventEmitter = eventEmitter;
    this.#submitButton = Array.from(formElement.elements).find(
      (element) => element.id === "submit-button"
    );
    this.#submitButton.removeAttribute("id");
    this.#submitButton.addEventListener("click", (event) =>
      this.#validateFormHandler(event)
    );
  }

  #validateFormHandler(event) {
    if (this.#formElement.reportValidity()) {
      event.preventDefault();
      if (this.validFormEvent) {
        this.#eventEmitter.emit(this.validFormEvent);
      }
    }
  }
  validFormEvent = "";
}
