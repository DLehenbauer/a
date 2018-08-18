const ROT = require('../../ext/rot.js/rot')
import { Creature } from './creature'

export class Monster extends Creature {
  constructor(x, y, symbol) {
    super(x, y, symbol)
  }

  move(map, playerX, playerY) {
    const path = []
    const astar = new ROT.Path.AStar(playerX, playerY, map.isPassableAt)
    astar.compute(this.x, this.y, (x, y) => path.push({x, y}))

    this.x = path[1].x
    this.y = path[1].y
  }
}