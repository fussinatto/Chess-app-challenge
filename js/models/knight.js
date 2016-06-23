var app = app || {};

(function() {
  'use strict';

  /**
   * Knight Model  - It has the same functionality as pawn
   * @constructor
   */

  app.Knight = app.Pawn.extend({
    defaults: {
      name: 'knight',
      moveUp: true
    },

    initialize: function() {
      app.Pawn.prototype.initialize.apply(this, arguments); // super()
    },

    checkMovement: function(square, sqareFigure) {
      return app.Pawn.prototype.checkMovement.apply(this, arguments); // super()
    }

  });
})();
