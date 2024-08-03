export default class MediaPreview {
  static #template = document.getElementById("media-preview-template");
  #mediaPreveiwFilledTemplate;

  data;
  element;

  constructor(mediaData) {
    this.data = mediaData;

    const filledTemplate = MediaPreview.#template.content.cloneNode(true);

    for (const key in this.data) {
      if (key === "title" || key === "likes") {
        const elements = Array.from(
          filledTemplate.querySelectorAll(`.template-${key}`)
        );
        elements.forEach((element) => {
          element.textContent = this.data[key];
          element.classList.remove(`template-${key}`);
        });
      }
    }

    const article = filledTemplate.querySelector("article");
    article.id = this.data.id;

    const container = filledTemplate.querySelector(".template-media-container");
    let media;

    if (this.data.type === "image") {
      media = document.createElement("img");
      media.src = this.data.ressource;
    }
    if (this.data.type === "video") {
      media = document.createElement("video");
      // media.controls = true;
      const source = document.createElement("source");
      source.src = this.data.ressource;
      media.append(source);
    }

    media.alt = this.data.title;
    container.append(media);
    container.classList.remove("template-media-container");

    this.#mediaPreveiwFilledTemplate = filledTemplate;
  }

  append() {
    MediaPreview.#template.parentElement.append(
      this.#mediaPreveiwFilledTemplate
    );
    this.element = MediaPreview.#template.parentElement.lastElementChild;
  }

  reRender() {
    this.element.remove();
    MediaPreview.#template.parentElement.append(this.element);
  }

  remove() {
    this.element.remove();
  }
}
