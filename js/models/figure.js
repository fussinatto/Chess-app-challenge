var app = app || {};

(function() {
  'use strict';

  /**
   * Figure Model that will serve as base for all others figures
   * @constructor
   */

  app.Figure = Backbone.Model.extend({

    defaults: {
      name: '',
      color: '',
      position: '',
    },

    initialize: function() {
      // not much is going on here
    },

    isValidJump: function() {
      // variables
      var squareCol, squareRow, isValid = true;

      var col0 = +this.currentPosition.charAt(0),
        col1 = +this.newPosition.charAt(0),
        row0 = +this.currentPosition.charAt(1),
        row1 = +this.newPosition.charAt(1),
        maxDistance = Math.max(Math.abs(this.colDifference), Math.abs(this.rowDifference));


      for (var i = 1; i < maxDistance; i++) {

        if (this.colDifference === 0) {
          squareCol = col0;
        } else {
          squareCol = col0 + (col0 < col1 ? i : -i);
        }

        if (this.rowDifference === 0) {
          squareRow = row0;
        } else {
          squareRow = row0 + (row0 < row1 ? i : -i);
        }

        if (app.figures.findWhere({ position: squareCol + '' + squareRow })) {
          isValid = false;
          break;
        }
      }

      return isValid;
    },

    /**
     * Base checkMovement method that saves a basic data
     * @param square - jQuery element
     * @param sqareFigure - app.Figure object
     */
    checkMovement: function(square, sqareFigure) {

      this.newPosition = square.attr('class');
      this.currentPosition = this.get('position');

      this.colDifference = Math.abs(+this.newPosition.charAt(0) - +this.currentPosition.charAt(0));
      this.rowDifference = +this.newPosition.charAt(1) - +this.currentPosition.charAt(1);

    }
  });
})();
