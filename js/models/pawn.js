var app = app || {};

(function() {
  'use strict';

  /**
   * Pawn Model
   * @constructor
   */

  app.Pawn = app.Figure.extend({
    defaults: {
      name: 'pawn',
      moveUp: true
    },

    initialize: function() {
      app.Figure.prototype.initialize.apply(this, arguments); // super()

      if (this.get('color') == 'black') {
        this.set('moveUp', false);
      }
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

      this.rowDifference += (this.get('moveUp') ? 0 : 2); // Set black pawns movement to +1 instead of -1

      if (sqareFigure) {
        //if Figure exists means pawn should change the column and move forward one position
        if (this.colDifference == 1 && this.rowDifference == 1) {

          this.set('position', this.newPosition);
          app.figures.remove(sqareFigure);
          return true;

        } else {
          return false;
        }
      } else {
        // Determine if new position is the same column and one row apart
        if (this.colDifference === 0 && this.rowDifference === 1) {

          this.set('position', this.newPosition);
          return true;

        } else {
          return false;
        }
      }
    }

  });
})();
