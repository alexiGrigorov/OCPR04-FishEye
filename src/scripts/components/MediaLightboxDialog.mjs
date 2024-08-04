import Modal from "../functions/Modal.mjs";

export default class MediaLightboxDialog {
  #eventCoordinator;
  #eventPrefix;

  #mediaPreviewElements;
  #modal;

  #previousMediaButton;
  #nextMediaButton;
  #lightbox;

  #currentMediaIndex;

  constructor(eventCoordinator, dialog, mediaPreviewElements) {
    this.#eventCoordinator = eventCoordinator;
    this.#eventPrefix = "lightbox";

    this.#mediaPreviewElements = mediaPreviewElements;
    this.#modal = dialog;

    this.#previousMediaButton = dialog.querySelector("#previous-media");
    this.#previousMediaButton.removeAttribute("id");
    this.#nextMediaButton = dialog.querySelector("#next-media");
    this.#nextMediaButton.removeAttribute("id");
    this.#lightbox = dialog.querySelector("#lightbox");
    this.#lightbox.removeAttribute("id");
  }

  init() {
    this.#mediaPreviewElements.forEach((mediaPreviewElement) =>
      mediaPreviewElement.element.children[0].addEventListener(
        "click",
        (event) => {
          console.log(event.target);
          this.#currentMediaIndex = this.#mediaPreviewElements.findIndex(
            (element) => element.element.contains(event.target)
          );
          console.log(this.#currentMediaIndex);
          this.#showPresentMedia(this.#currentMediaIndex);
          this.#eventCoordinator.emit(`${this.#eventPrefix}-openModal`);
        }
      )
    );

    this.#previousMediaButton.addEventListener("click", () => {
      this.#showPreviousMedia();
    });

    this.#nextMediaButton.addEventListener("click", () => {
      this.#showNextMedia();
    });

    this.#modal.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        this.#showPreviousMedia();
      }
      if (event.key === "ArrowRight") {
        this.#showNextMedia();
      }
    });

    new Modal(this.#eventCoordinator, this.#modal);
  }

  #showPreviousMedia() {
    this.#currentMediaIndex =
      (this.#currentMediaIndex - 1 + this.#mediaPreviewElements.length) %
      this.#mediaPreviewElements.length;
    this.#showPresentMedia(this.#currentMediaIndex);
  }

  #showNextMedia() {
    this.#currentMediaIndex =
      (this.#currentMediaIndex + 1) % this.#mediaPreviewElements.length;
    this.#showPresentMedia(this.#currentMediaIndex);
  }

  #showPresentMedia(index) {
    const mediaPreviewData = this.#mediaPreviewElements[index].data;

    let media;

    if (mediaPreviewData.type === "image") {
      media = document.createElement("img");
      media.src = mediaPreviewData.ressource;
    }
    if (mediaPreviewData.type === "video") {
      media = document.createElement("video");
      media.controls = true;
      const source = document.createElement("source");
      source.src = mediaPreviewData.ressource;
      media.append(source);
    }

    media.alt = mediaPreviewData.title;

    const title = document.createElement("p");
    title.textContent = mediaPreviewData.title;

    this.#lightbox.replaceChildren(media, title);
  }
}
