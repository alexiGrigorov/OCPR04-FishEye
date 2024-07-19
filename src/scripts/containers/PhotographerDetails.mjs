import PhotographerIdentity from "../templates/PhotographerIdentity.mjs";
import PhotographerContact from "../templates/PhotographerContact.mjs";
import PhotographerPortrait from "../templates/PhotographerPortrait.mjs";

export default class PhotographerDetails {
  #photographerDetails = [];

  constructor() {}

  init(photographerData) {
    const photographerIdentity = new PhotographerIdentity(photographerData);
    this.#photographerDetails.push(photographerIdentity);
    photographerIdentity.append();

    const photographerContact = new PhotographerContact(photographerData);
    this.#photographerDetails.push(photographerContact);
    photographerContact.append();

    const photographerPortrait = new PhotographerPortrait(photographerData);
    this.#photographerDetails.push(photographerPortrait);
    photographerPortrait.append();
  }
}
