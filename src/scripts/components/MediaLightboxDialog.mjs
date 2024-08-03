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
    this.#mediaPreviewElements.forEach((mediaPreviewElement, index) =>
      mediaPreviewElement.element.children[0].addEventListener("click", () => {
        this.#eventCoordinator.emit(`${this.#eventPrefix}-openModal`);
        this.#currentMediaIndex = index;
        this.#presentMedia(index);
      })
    );

    this.#previousMediaButton.addEventListener("click", () => {
      this.#currentMediaIndex =
        (this.#currentMediaIndex - 1 + this.#mediaPreviewElements.length) %
        this.#mediaPreviewElements.length;
      this.#presentMedia(this.#currentMediaIndex);
    });

    this.#nextMediaButton.addEventListener("click", () => {
      this.#currentMediaIndex =
        (this.#currentMediaIndex + 1) % this.#mediaPreviewElements.length;
      this.#presentMedia(this.#currentMediaIndex);
    });

    new Modal(this.#eventCoordinator, this.#modal);
  }

  #presentMedia(index) {
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
    this.#lightbox.replaceChildren(media);
  }
}
