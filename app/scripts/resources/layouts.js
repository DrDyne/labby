define(function () {
  return {
    stage1: {
      itemsPerRow: 3,
      max: 2,
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
    stage2: {
      itemsPerRow: 4,
      max: 2,
      map: [
        {  //row 0
          allows: ['up', 'left'],
        }, {
          allows: ['up', 'right', 'down'],
        }, {
          allows: ['up', 'down'],
          player: 'player2',
        }, {
          allows: ['left', 'right'],
        }, { //row 1
          allows: ['all'],
          bonus: 'double-move',
        }, {
          allows: ['all'],
        }, {
          allows: ['right'],
        }, {
          allows: ['all'],
        }, { //row2
          allows: ['up', 'left'],
        }, {
          allows: ['all'],
        }, {
          allows: ['right'],
        }, {
          allows: ['all'],
        }, { // row 3
          allows: ['up', 'left'],
        }, {
          allows: ['up', 'right', 'down'],
          player: 'player1',
        }, {
          allows: ['up', 'down'],
        }, {
          allows: ['left', 'right'],
        }
      ],
    },
    stage3: {
      max: 4,
      locked: true
    }
  }
});
