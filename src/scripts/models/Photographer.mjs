export default class DataModelPhotographer {
  constructor(rawData) {
    this.id = rawData.id;
    this.portrait = `./../../../assets/images/photographers/thumbnails/${rawData.portrait}`;
    this.name = rawData.name;
    this.location = `${rawData.city}, ${rawData.country}`;
    this.tagline = rawData.tagline;
    this.price = `${rawData.price}€/jour`;
  }
}
