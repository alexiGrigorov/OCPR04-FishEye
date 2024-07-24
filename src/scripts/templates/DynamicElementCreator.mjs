export default class DynamicElementCreator {
  elements = [];

  constructor(templateClass, data) {
    data.forEach((dataPoint) => {
      this.elements.push(new templateClass(dataPoint));
    });

    this.elements.forEach((element) => {
      element.append();
    });
  }
}
