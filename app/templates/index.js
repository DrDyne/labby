define([
  'text!templates/map-square.html',
  'text!templates/map-surface-row.html',
  'text!templates/game-menu.html',
], function (
  mapSquare,
  mapRow,
  gameMenu
) {
  return {
    mapSquare: _.template(mapSquare),
    mapRow: _.template(mapRow),
    gameMenu: _.template(gameMenu),
  }
});
