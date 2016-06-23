var app = app || {};

(function() {
  'use strict';

  /**
   * King Model
   * @constructor
   */
   
  app.King = app.Figure.extend({
    defaults: {
      name: 'king'
    },

    initialize: function() {
      app.Pawn.prototype.initialize.apply(this, arguments); // super()
    },

    /**
     * CheckMovement method that verifies validity of the move and eventually sets a new position
     *
     * @param square - jQuery element
     * @param sqareFigure - app.Figure object
     * @returns {boolean}
     */
    checkMovement: function(square, sqareFigure) {
      app.Figure.prototype.checkMovement.apply(this, arguments); // super()

      this.colDifference = Math.abs(this.colDifference);
      this.rowDifference = Math.abs(this.rowDifference);

      // Allow movement in all directions by one square
      if (this.colDifference <= 1 && this.rowDifference <= 1) {
        this.set('position', this.newPosition);

        // Eat opponent figure if exists
        if (sqareFigure) {
          app.figures.remove(sqareFigure);
        }
        return true;

      } else {
        return false;
      }

    }

  });
})();
