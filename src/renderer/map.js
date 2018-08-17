const ROT = require('../../ext/rot.js/rot')
import { Array2D } from "./array2d";

export class Map extends Array2D {
  constructor(width, height) {
    super(width, height);

    this.isPassable = (x, y) => this.getAt(x, y) ? true : false
  }

  generate() {
    const map = new ROT.Map.Digger(this.width, this.height);

    map.create((x, y, value) => {
      // Do not store walls
      if (value) {
        return;
      }

      this.setAt(x, y, 1);
    });

    this.rooms = map.getRooms();
  }
}