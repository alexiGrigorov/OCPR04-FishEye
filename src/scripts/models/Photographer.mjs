export default class DataModelPhotographer {
  constructor(rawData) {
    this.id = rawData.id;
    this.portrait = `./data/Sample%20Photos/Photographers%20ID%20Photos/thumbnails/${rawData.portrait}`;
    this.name = rawData.name;
    this.location = `${rawData.city}, ${rawData.country}`;
    this.tagline = rawData.tagline;
    this.price = `${rawData.price}€/jour`;
  }
}
