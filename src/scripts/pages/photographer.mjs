import DataProvider from "../database/DataProvider.mjs";
import EventCoordinator from "../events/EventCoordinator.mjs";

import DynamicElementCreator from "../templates/DynamicElementCreator.mjs";
import MediaPreview from "../templates/MediaPreview.mjs";
import ContactForm from "../components/ContactForm.mjs";
import SortableGalery from "../components/SortableGalery.mjs";
import LikesCounter from "../components/LikesCounter.mjs";
import MediaLightboxDialog from "../components/MediaLightboxDialog.mjs";

class Photographer {
  #dataProvider;
  #eventCoordinator;

  #photographer;
  #featuredMedia;

  #interactiveElements = [];

  constructor() {
    this.#dataProvider = new DataProvider();
    this.#eventCoordinator = new EventCoordinator();
  }

  async init() {
    const photographers = await this.#dataProvider.getPhotographers();
    this.#photographer = this.#URLGateKeepter(photographers);

    this.#fillStaticDetails(this.#photographer);

    const media = (await this.#dataProvider.getMedia()).filter(
      (media) => media.photographerId === this.#photographer.id
    );

    this.#loadDynamicElements(media);

    this.#initializeInteractiveElements();

    this.#eventCoordinator.subscribe("likes-changed", (mediaId) => {
      this.#dataProvider.updateMediaLikes(mediaId);
    });
  }

  #URLGateKeepter(photographers) {
    const urlParams = new URLSearchParams(window.location.search);

    const photographer = photographers.find(
      (photographer) => photographer.id === Number(urlParams.get("id"))
    );

    if (!photographer) {
      window.location.replace("./");
    }

    return photographer;
  }

  #fillStaticDetails(photographer) {
    for (const key in photographer) {
      if (key !== "portrait" && key !== "id") {
        const elements = Array.from(
          document.querySelectorAll(`.static-${key}`)
        );
        elements.forEach((element) => {
          element.textContent = photographer[key];
          element.classList.remove(`static-${key}`);
        });
      }
    }

    const portrait = document.querySelector(".static-portrait");
    portrait.src = photographer.portrait;
    portrait.alt = photographer.name;
    portrait.classList.remove("static-portrait");
  }

  #loadDynamicElements(media) {
    this.#featuredMedia = new DynamicElementCreator(
      MediaPreview,
      media
    ).elements;
  }

  #initializeInteractiveElements() {
    const contactForm = new ContactForm(
      this.#eventCoordinator,
      document.getElementById("contact-modal"),
      document.getElementById("contact-button")
    );
    this.#interactiveElements.push(contactForm);

    const sortableGalery = new SortableGalery(
      this.#eventCoordinator,
      document.getElementsByClassName("sort")[0],
      this.#featuredMedia
    );
    this.#interactiveElements.push(sortableGalery);

    const likesCounter = new LikesCounter(
      this.#eventCoordinator,
      document.getElementsByClassName("total-likes")[0],
      this.#featuredMedia
    );
    this.#interactiveElements.push(likesCounter);

    const mediaLightboxDialog = new MediaLightboxDialog(
      this.#eventCoordinator,
      document.getElementById("lightbox-modal"),
      this.#featuredMedia
    );
    this.#interactiveElements.push(mediaLightboxDialog);

    this.#interactiveElements.forEach((element) => element.init());
  }
}

const photographerPage = new Photographer();
photographerPage.init();
