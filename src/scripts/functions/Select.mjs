export default class CustomSelect {
  #eventCoordinator;
  #eventPrefix;

  #currentOption;
  #selectMask;
  #selectElement;
  #selectMenu;

  constructor(eventCoordinator, select) {
    this.#eventCoordinator = eventCoordinator;
    this.#eventPrefix = select.classList[0].split("-")[0];

    this.#selectMask = select.getElementsByClassName("select-mask")[0];
    this.#selectElement = select.getElementsByClassName("select-element")[0];
    this.#selectMenu = select.getElementsByClassName("select-menu")[0];
  }

  init() {
    this.#currentOption = this.#selectElement.value;

    this.#selectElement.addEventListener("change", () => {
      this.#currentOption = this.#selectElement.value;
      this.#eventCoordinator.emit(
        `${this.#eventPrefix}-valueChanged`,
        this.#selectElement.value
      );
    });

    this.#selectElement.addEventListener("keydown", (event) => {
      if (event.code === "Enter" || event.code === "Space") {
        event.preventDefault();
        this.#showSelectMenu();
      }
    });

    this.#selectMask.addEventListener("click", (event) => {
      event.stopPropagation();
      this.#showSelectMenu();
    });

    this.#selectMenu.addEventListener("keydown", (event) => {
      if (event.code === "ArrowUp" || event.code === "ArrowDown") {
        event.preventDefault();
        this.#focusOnNewOption(event);
      }
    });

    this.#selectMenu.addEventListener("keydown", (event) => {
      if (event.code === "Enter" || event.code === "Space") {
        event.preventDefault();
        this.#selectNewOption(event);
        this.#hideSelectMenu();
      }
    });

    this.#selectMenu.addEventListener("click", (event) => {
      event.preventDefault();
      this.#selectNewOption(event);
      this.#hideSelectMenu();
    });

    document.addEventListener("click", (event) => {
      if (!this.#selectMenu.contains(event.target)) {
        this.#hideSelectMenu();
      }
    });

    this.#eventCoordinator.emit(
      `${this.#eventPrefix}-valueChanged`,
      this.#selectElement.value
    );
  }

  #showSelectMenu() {
    this.#selectMenu.dataset.visible = "true";
    const selectedOption = Array.from(this.#selectMenu.children).find(
      (option) => option.dataset.value === this.#selectElement.value
    );
    selectedOption.focus();
  }

  #hideSelectMenu() {
    this.#selectMenu.dataset.visible = "false";
  }

  #selectNewOption(event) {
    if (event.target.tagName !== "BUTTON") return;
    const currentlyFocusedOption = event.target.dataset.value;
    if (currentlyFocusedOption !== this.#currentOption) {
      this.#selectElement.value = currentlyFocusedOption;
      const changeEvent = new Event("change", { bubbles: true });
      this.#selectElement.dispatchEvent(changeEvent);
    }
  }

  #focusOnNewOption(event) {
    const currentlyFocusedOption = document.activeElement;
    const options = Array.from(this.#selectMenu.children);
    const currentIndex = options.indexOf(currentlyFocusedOption);
    let newIndex;
    if (event.code === "ArrowUp") {
      newIndex = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === options.length - 1 ? 0 : currentIndex + 1;
    }
    options[newIndex].focus();
  }
}
