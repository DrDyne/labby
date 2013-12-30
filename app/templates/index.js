define([
  'text!templates/app-menu-stages.html',
  'text!templates/app-menu.html',
  'text!templates/hud-actions.html',
  'text!templates/hud-chat.html',
  'text!templates/hud-squares.html',
  'text!templates/hud.html',
  'text!templates/map-move-candidate.html',
  'text!templates/map-square.html',
  'text!templates/map-surface-row.html',
], function (
  appMenuStages,
  appMenu,
  hudActions,
  hudChat,
  hudSquares,
  hud,
  mapMoveCandidate,
  mapSquare,
  mapRow
) {
  return {
    app: {
      menu: _.template(appMenu),
      menuStages: _.template(appMenuStages),
    },
    hud: {
      actions: _.template(hudActions),
      base: _.template(hud),
      chat: _.template(hudChat),
      squares: _.template(hudSquares),
    },
    map: {
      moveCandidate: _.template(mapMoveCandidate),
      square: _.template(mapSquare),
      row: _.template(mapRow),
    }
  }
});
