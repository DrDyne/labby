define([
  './move',
  './push',
  './use',
], function (Move, Push, Use) {
  return {
    Move: Move,
    Push: Push,
    Use: Use,
  }
});
