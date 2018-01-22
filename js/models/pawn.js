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
      initPosition: true
    },

    initialize: function() {
      app.Figure.prototype.initialize.apply(this, arguments); // super()
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
      this.set('rowDifference', Math.abs(this.get('rowDifference'))); // Set black pawns movement to +1 instead of -1
     
      if (sqareFigure) {
        //if Figure exists means pawn should change the column and move forward one position
        if (Math.abs(this.colDifference) === 1 && Math.abs(this.rowDifference) === 1) {

          this.set('position', this.newPosition);
          app.figures.remove(sqareFigure);
          return true;
          
        } else {
          return false;
        }
      } else {
        var maxMove = this.get('initPosition') ? 2 : 1;
        // Determine if new position is the same column and one row apart
        if (this.colDifference === 0 && this.rowDifference && Math.abs(this.rowDifference) <= maxMove) {
          
          this.set('position', this.newPosition);
          this.set('initPosition', false);
          return true;

        } else {
          return false;
        }
      }
    }

  });
})();
