const ROT = require('../../ext/rot.js/rot')
import { Map } from './map';
import { Creature } from './creature';
import { Monster } from './monster';

const creatures = [];
const w = 50;
const h = 25;
const display = new ROT.Display({ width: w, height: h });
const displayContainer = display.getContainer();
document.body.appendChild(displayContainer);

const map = new Map(w, h);
map.generate()

const player = new Creature(
  map.rooms[0].getLeft(),
  map.rooms[0].getTop(),
  '@')
creatures.push(player)

const monster = new Monster(
  map.rooms[0].getRight(),
  map.rooms[0].getBottom(),
  '&')
creatures.push(monster)

const render = () => {
  const fov = new ROT.FOV.PreciseShadowcasting((x, y) => {
    return map.getAt(x, y);
  });
  
  fov.compute(player.x, player.y, 6, (x, y, r, visibility) => {
    const tile = map.getAt(x, y);
    if (!tile) {
      display.draw(x, y, '#');
    } else {
      display.draw(x, y, '.');
    }
  }); 

  // for (let y = 0; y < map.height; y++) {
  //   for (let x = 0; x < map.width; x++) {
  //     const tile = map.getAt(x, y);
  //     if (!tile) {
  //       display.draw(x, y, '#');
  //     } else {
  //       display.draw(x, y, '.');
  //     }
  //   }
  // }
  
  for (const creature of creatures) {
    display.draw(creature.x, creature.y, creature.symbol);
  }
}

render();

const movePlayer = (deltaX, deltaY) => {
  const newX = player.x + deltaX;
  const newY = player.y + deltaY;

  if (!map.getAt(newX, newY)) {
    return;
  }

  player.x = newX;
  player.y = newY;

  monster.move(map, player.x, player.y)

  render();
}

window.addEventListener('keydown', e => {
  switch (e.key) {
    case '1': movePlayer(-1, 1); break;
    case '2': movePlayer(0, 1); break;
    case '3': movePlayer(1, 1); break;
    case '4': movePlayer(-1, 0); break;
    case '6': movePlayer(1, 0); break;
    case '7': movePlayer(-1, -1); break;
    case '8': movePlayer(0, -1); break;
    case '9': movePlayer(1, -1); break;
  }
  render();
})