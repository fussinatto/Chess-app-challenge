var app = app || {};

// Constants
app.FIGURE_POSITION = {
  Rook: {
    white: ['11', '81'],
    black: ['18', '88']
  },
  Knight: {
    white: ['21', '71'],
    black: ['28', '78']
  },
  Bishop: {
    white: ['31', '61'],
    black: ['38', '68']
  },
  Queen: {
    white: ['41'],
    black: ['48']
  },
  King: {
    white: ['51'],
    black: ['58']
  }
};

$(function() {
  'use strict';

  // initiate app
  new app.AppView();
});
