export default class LikesCounter {
  #eventCoordinator;
  #eventPrefix;

  #totalLikesCounterElement;
  #mediaPreviewElements;

  #mediaLikeButtons;

  constructor(
    eventCoordinator,
    totalLikesCounterElement,
    mediaPreviewElements
  ) {
    this.#eventCoordinator = eventCoordinator;
    this.#eventPrefix = "likes";

    this.#totalLikesCounterElement = totalLikesCounterElement;
    this.#mediaPreviewElements = mediaPreviewElements;
  }

  init() {
    this.#mediaLikeButtons = this.#mediaPreviewElements.map(
      (mediaPreviewElement) =>
        mediaPreviewElement.element.querySelector(".likes")
    );

    console.log("likes counter initialized");
    this.#totalLikesCounterElement.textContent = this.#countTotalLikes();
    this.#mediaLikeButtons.forEach((likeButton) =>
      likeButton.addEventListener("click", () => this.#mediaLiked(event))
    );
  }

  #mediaLiked(event) {
    const likedMediaId = Number(event.target.closest("article").id);
    const mediaPreviewElement = this.#mediaPreviewElements.find(
      (mediaPreview) => mediaPreview.data.id === likedMediaId
    );
    mediaPreviewElement.data.likes += 1;
    this.#eventCoordinator.emit(`${this.#eventPrefix}-changed`, likedMediaId);

    event.target.textContent = Number(event.target.textContent) + 1;
    this.#totalLikesCounterElement.textContent = this.#countTotalLikes();
  }

  #countTotalLikes() {
    return this.#mediaLikeButtons.reduce(
      (total, mediaLikes) => total + Number(mediaLikes.textContent),
      0
    );
  }
}
