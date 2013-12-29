define([
  'text!templates/app-menu-stages.html',
  'text!templates/app-menu.html',
  'text!templates/hud-actions.html',
  'text!templates/hud-chat.html',
  'text!templates/hud-squares.html',
  'text!templates/hud.html',
  'text!templates/map-square.html',
  'text!templates/map-surface-row.html',
], function (
  appMenuStages,
  appMenu,
  hudActions,
  hudChat,
  hudSquares,
  hud,
  mapSquare,
  mapRow
) {
  return {
    appMenu: _.template(appMenu),
    appMenuStages: _.template(appMenuStages),
    hudActions: _.template(hudActions),
    hudChat: _.template(hudChat),
    hudSquares: _.template(hudSquares),
    hud: _.template(hud),
    mapSquare: _.template(mapSquare),
    mapRow: _.template(mapRow),
  }
});
