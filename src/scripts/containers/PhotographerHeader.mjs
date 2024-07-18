import PhotographerIdentity from "../templates/PhotographerIdentity.mjs";
import PhotographerContact from "../templates/PhotographerContact.mjs";
import PhotographerPortrait from "../templates/PhotographerPortrait.mjs";

export default class PhotographerHeader {
  #photographerIdentity;
  #photographerContact;
  #photographerPortrait;

  constructor(data) {
    this.#photographerIdentity = new PhotographerIdentity(data);
    this.#photographerPortrait = new PhotographerPortrait(data);
    this.#photographerContact = new PhotographerContact(data);
  }

  append() {
    this.#photographerIdentity.append();
    this.#photographerPortrait.append();
    this.#photographerContact.append();
  }

  remove() {
    this.#photographerIdentity.remove();
    this.#photographerPortrait.remove();
    this.#photographerContact.remove();
  }
}
