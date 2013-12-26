define([
  'text!templates/map-square.html',
  'text!templates/map-surface-row.html',
  'text!templates/app-menu.html',
  'text!templates/app-menu-stages.html',
  'text!templates/hud.html',
], function (
  mapSquare,
  mapRow,
  appMenu,
  appMenuStages,
  hud
) {
  return {
    mapSquare: _.template(mapSquare),
    mapRow: _.template(mapRow),
    appMenu: _.template(appMenu),
    appMenuStages: _.template(appMenuStages),
    hud: _.template(hud),
  }
});
