const ROT = require('../../ext/rot.js/rot')
import { SparseArray2D } from "./sparsearray2d";

const TileFlags = {
  none:       0,
  passable:   (1 << 0),
  opaque:     (1 << 1),
}

const tiles = {
  0:  { symbol: '#', flags: TileFlags.opaque },
  1:  { symbol: '.', flags: TileFlags.passable },
}

export class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cells = new SparseArray2D(width, height, 0);
    this.lighting = new SparseArray2D(width, height, 0);
    this.isPassableAt = (x, y) => (this.getTileAt(x, y).flags & TileFlags.passable)
  }

  getTileAt(x, y) {
    return tiles[this.cells.getAt(x, y)];
  }

  getLightingAt(x, y) {
    return this.lighting.getAt(x, y)
  }

  resetLighting() {
    this.lighting = new SparseArray2D(this.width, this.height, 0);
  }

  lightAt(x, y, r) {
    const fov = new ROT.FOV.PreciseShadowcasting((x, y) => {
      return !(this.getTileAt(x, y).flags & TileFlags.opaque)
    });
    
    fov.compute(x, y, r, (x, y, r, visibility) => {
      this.lighting.setAt(x, y, r);
    });
  }

  generate() {
    const map = new ROT.Map.Digger(this.width, this.height);

    map.create((x, y, value) => {
      // Do not store walls
      if (value) {
        return;
      }

      this.cells.setAt(x, y, 1);
    });

    this.rooms = map.getRooms();
  }
}