export default class DataProvider {
  #rawData;
  #photographers;
  #medias;

  constructor(url) {
    this.url = url;
    this.#rawData = sessionStorage.getItem("rawData")
      ? JSON.parse(sessionStorage.getItem("rawData"))
      : this.#fetchRawData();
    this.#photographers = sessionStorage.getItem("photographers")
      ? JSON.parse(sessionStorage.getItem("photographers"))
      : this.#parsePhotographers();
    this.#medias = sessionStorage.getItem("medias")
      ? JSON.parse(sessionStorage.getItem("medias"))
      : this.#parseMedias();
  }

  async #fetchRawData() {
    try {
      const response = await fetch(this.url);
      const rawData = await response.json();
      sessionStorage.setItem("rawData", JSON.stringify(rawData));
      return rawData;
    } catch (error) {
      throw new Error(error);
    }
  }

  async #parsePhotographers() {
    const rawData = await this.#rawData;
    const photographers = rawData.photographers.map(
      (photographer) => new DataModelPhotographer(photographer)
    );
    sessionStorage.setItem("photographers", JSON.stringify(photographers));
    return photographers;
  }

  async #parseMedias() {
    // Ensures that both promises resolve in parallel rather than sequentially
    const [rawData, photographers] = await Promise.all([
      this.#rawData,
      this.#photographers,
    ]);

    const dataModelMediaFactory = new DataModelMediaFactory(photographers);
    const medias = rawData.media.map((media) =>
      dataModelMediaFactory.create(media)
    );
    sessionStorage.setItem("medias", JSON.stringify(medias));
    return medias;
  }

  get photographers() {
    return new Promise((resolve) => resolve(this.#photographers));
  }

  get medias() {
    return new Promise((resolve) => resolve(this.#medias));
  }
}

class DataModelPhotographer {
  constructor(rawData) {
    this.id = rawData.id;
    this.portrait = `./data/Sample%20Photos/Photographers%20ID%20Photos/thumbnails/${rawData.portrait}`;
    this.name = rawData.name;
    this.location = `${rawData.city}, ${rawData.country}`;
    this.tagline = rawData.tagline;
    this.price = `${rawData.price}€/jour`;
  }
}

class DataModelMediaFactory {
  constructor(photographers) {
    this.photographers = photographers;
  }
  create(rawData) {
    const photographer = this.photographers.find(
      (photographer) => photographer.id === rawData.photographerId
    );
    const firstName = photographer.name.split(" ")[0];
    if ("image" in rawData) {
      return new DataModelImage(rawData, firstName);
    }
    if ("video" in rawData) {
      return new DataModelVideo(rawData, firstName);
    }
  }
}

class DataModelMedia {
  constructor(rawData) {
    this.id = rawData.id;
    this.photographerId = rawData.photographerId;
    this.likes = rawData.likes;
    this.title = rawData.title;
    this.date = rawData.date;
    // this.price = rawData.price;
  }
}

class DataModelImage extends DataModelMedia {
  constructor(rawData, photographerFirstName) {
    super(rawData);
    this.type = "image";
    this.ressource = `../../data/Sample_Photos/${photographerFirstName}`;
  }
}

class DataModelVideo extends DataModelMedia {
  constructor(rawData, photographerFirstName) {
    super(rawData);
    this.type = "video";
    this.ressource = `../../data/Sample_Photos/${photographerFirstName}`;
  }
}
