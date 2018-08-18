export class SparseArray2D {
  constructor(width, height, defaultValue) {
    this.width = width;
    this.height = height;
    this.defaultValue = defaultValue;
    this.items = new Array(width * height);
  }

  getIndex(x, y) {
    return y * this.width + x;
  }

  getAt(x, y) {
    const value = this.items[this.getIndex(x, y)]
    return typeof value === "undefined"
      ? this.defaultValue
      : value;
  }

  setAt(x, y, value) {
    this.items[this.getIndex(x, y)] = value;
  }
}