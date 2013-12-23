define(function () {
  return {
    stage1: {
      itemsPerRow: 3, //remember developers start counting at ZERO
      map: [
        {  //row 0
          allows: ['up', 'left'], 
        }, {
          allows: ['up', 'right', 'down'],
        }, {
          allows: ['up', 'down'],
          player: 'player2',
        }, { //row 1
          allows: ['left', 'right'],
        }, {
          allows: ['all'],
          bonus: 'double-move',
        }, {
          allows: ['all'],
        }, { //row2
          allows: ['right'],
          player: 'player1',
        }, {
          allows: ['all'],
        }, {
          allows: ['up', 'left'],
        }
      ],
    },
  }
});
