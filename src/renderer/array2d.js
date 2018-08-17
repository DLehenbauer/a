export class Array2D {
  constructor(width, height) {
    this.items = new Array(width * height);
    this.width = width;
    this.height = height;
  }

  getIndex(x, y) {
    return y * this.width + x;
  }

  getAt(x, y) {
    return this.items[this.getIndex(x, y)];
  }

  setAt(x, y, value) {
    this.items[this.getIndex(x, y)] = value;
  }
}