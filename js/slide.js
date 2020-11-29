export default class Slides {
  constructor(wrapper, slides) {
    this.wrapper = document.querySelector(wrapper);
    this.slides = document.querySelector(slides);
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
  }
  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slides.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updateposition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    event.preventDefault();
    this.dist.startX = event.clientX;
    this.wrapper.addEventListener('mousemove', this.onMove);
  }
  onMove(event) {
    const finalPosition = this.updateposition(event.clientX);
    this.moveSlide(finalPosition);
  }
  onEnd() {
    this.wrapper.removeEventListener('mousemove', this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }
  addSlidesEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onMove = this.onMove.bind(this);
  }
  init() {
    this.bindEvents();
    this.addSlidesEvents();
    return this;
  }
}
