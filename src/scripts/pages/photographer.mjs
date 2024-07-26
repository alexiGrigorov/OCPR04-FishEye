import DataProvider from "../database/DataProvider.mjs";
import EventCoordinator from "../events/EventCoordinator.mjs";

import DynamicElementCreator from "../templates/DynamicElementCreator.mjs";
import MediaPreview from "../templates/MediaPreview.mjs";
import CustomSelect from "../components/CustomSelect.mjs";

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

    this.#fillStaticPhotographerDetails(this.#photographer);

    const media = (await this.#dataProvider.getMedia()).filter(
      (media) => media.photographerId === this.#photographer.id
    );
    this.#loadDynamicElements(media);

    const sortFilter = document.getElementsByClassName("sort")[0];
    this.#interactiveElements.push(new CustomSelect(sortFilter));
    this.#interactiveElements.forEach((element) => element.init());
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

  #fillStaticPhotographerDetails(photographer) {
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
}

const photographerPage = new Photographer();
photographerPage.init();

// const portfolio = document.querySelector(".portfolio");
// const selectElement = document.querySelector("select");
// const maskElement = document.createElement("DIV");
// maskElement.classList.add("cover");

// const selectWrapper = document.createElement("DIV");

// portfolio.append(selectWrapper);
// selectWrapper.append(selectElement);
// selectWrapper.append(maskElement);

// selectElement.addEventListener("keydown", (event) => {
//   if (event.code === "Enter") {
//     // event.preventDefault();
//     maskElement.click();
//   }
//   console.log(event);
// });
