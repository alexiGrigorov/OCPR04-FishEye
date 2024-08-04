export default class DataModelMediaFactory {
  constructor(rawData, photographers) {
    const mediaPhotographer = photographers.find(
      (photographer) => photographer.id === rawData.photographerId
    );
    const firstName = mediaPhotographer.name.split(" ")[0];

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
    this.ressource = `./../../../assets/images/media/thumbnails/${photographerFirstName}/${rawData.image}`;
  }
}

class DataModelVideo extends DataModelMedia {
  constructor(rawData, photographerFirstName) {
    super(rawData);
    this.type = "video";
    this.ressource = `./../../../assets/images/media/thumbnails/${photographerFirstName}/${rawData.video}`;
  }
}
