define([
  'text!templates/map-square.html',
  'text!templates/map-surface-row.html',
  'text!templates/app-menu.html',
  'text!templates/app-menu-stages.html',
], function (
  mapSquare,
  mapRow,
  appMenu,
  appMenuStages
) {
  return {
    mapSquare: _.template(mapSquare),
    mapRow: _.template(mapRow),
    appMenu: _.template(appMenu),
    appMenuStages: _.template(appMenuStages),
  }
});
