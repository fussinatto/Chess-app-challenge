var app = app || {};

(function() {
  'use strict';

  /**
   * Queen Model
   * @constructor
   */

  app.Queen = app.Figure.extend({
    defaults: {
      name: 'queen'
    },

    initialize: function() {
      app.Pawn.prototype.initialize.apply(this, arguments); // super()
    },

    /**
     * Method checks if there are figures on tiles in between start and end position
     * (it is illegal for queen to jump over figures)
     *
     * @returns {boolean}
     */
    isValidJump: function() {
      return app.Figure.prototype.isValidJump.apply(this, arguments); // super()
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

      var absColDifference = Math.abs(this.colDifference);
      var absRowDifference = Math.abs(this.rowDifference);

      // Allow movement vertically, horizontally or diagonally
      if (absColDifference === 0 || absRowDifference === 0 || absColDifference === absRowDifference) {
        if (!this.isValidJump()) {
          return false;
        }

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
