export default class MediaPreview {
  static #template = document.getElementById("media-preview-template");

  #mediaData;
  #mediaPreveiwFilledTemplate;
  #mediaPreveiwElement;

  id;

  constructor(mediaData) {
    this.#mediaData = mediaData;
    this.id = this.#mediaData.id;
    const filledTemplate = MediaPreview.#template.content.cloneNode(true);

    for (const key in this.#mediaData) {
      if (key === "title" || key === "likes") {
        const elements = Array.from(
          filledTemplate.querySelectorAll(`.template-${key}`)
        );
        elements.forEach((element) => {
          element.textContent = this.#mediaData[key];
          element.classList.remove(`template-${key}`);
        });
      }
    }

    const container = filledTemplate.querySelector(".template-media-container");
    let media;

    if (this.#mediaData.type === "image") {
      media = document.createElement("img");
    }
    if (this.#mediaData.type === "video") {
      media = document.createElement("video");
    }
    media.src = this.#mediaData.ressource;
    media.alt = this.#mediaData.title;
    container.append(media);
    container.classList.remove("template-portrait");

    this.#mediaPreveiwFilledTemplate = filledTemplate;
  }

  append() {
    MediaPreview.#template.parentElement.append(
      this.#mediaPreveiwFilledTemplate
    );
    this.#mediaPreveiwElement =
      MediaPreview.#template.parentElement.lastElementChild;
  }

  remove() {
    this.#mediaPreveiwElement.remove();
  }
}
