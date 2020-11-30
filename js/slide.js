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
    let move;
    if (event.type === 'mousedown') {
      event.preventDefault();
      this.dist.startX = event.clientX;
      move = 'mousemove';
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      move = 'touchmove';
    }
    this.wrapper.addEventListener(move, this.onMove);
  }
  onMove(event) {
    const poiterPosition =
      event.type === 'mousemove'
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updateposition(poiterPosition);
    this.moveSlide(finalPosition);
  }
  onEnd(event) {
    const movementType = event.type === 'mouseup' ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(movementType, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }
  addSlidesEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('touchend', this.onEnd);
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
