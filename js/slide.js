export default class Slides {
  constructor(wrapper, slides) {
    this.wrapper = document.querySelector(wrapper);
    this.slides = document.querySelector(slides);
  }
  onStart(event) {
    event.preventDefault();
    this.wrapper.addEventListener('mousemove', this.onMove);
  }
  onMove(event) {
    console.log('Slide funcionando');
  }
  onEnd() {
    this.wrapper.removeEventListener('mousemove', this.onMove);
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
