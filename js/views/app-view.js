var app = app || {};

(function($) {
  'use strict';

  // ---------------
  // App View
  // ---------------

  /**
   * Main View
   *  @constructor
   */
  app.AppView = Backbone.View.extend({

    // Get existing DOM element
    el: '.b-chess-app',

    events: {
      'click td': 'handleSquareClick'
    },

    initialize: function() {

      // Event Listeners
      this.listenTo(app.figures, 'add', this.addOne);
      this.listenTo(app.figures, 'remove', this.removeOne);
      //this.listenTo(app.eaten, 'add', this.addEaten);
      
      // Variables
      this.activeFigure = null;
      this.activeSquare = null;
      this.whitesTurn = true;
      
      // DOM
      this.turnIndicator = $('.turn-indicator').text('white');
      this.eatenContainer = $('.eatenPiecesContainer');
      
      // Init
      this.addFigures();
      
      var handleBodyClickBinded = this.handleBodyClick.bind(this)
      $('body').bind('click', handleBodyClickBinded);
    },
    
    addFigures: function() {

      // Ad  Pawns
      for (var col = 1; col <= 8; col++) {
        app.figures.add(new app.Pawn({ color: 'white', position: col + '2' })); //add white pawns
        app.figures.add(new app.Pawn({ color: 'black', moveUp: false, position: col + '7' })); //add black pawns
      }

      // Other figures: iterate trough each key on app.FIGURE_POSITION and add figure to the board
      $.each(app.FIGURE_POSITION, function(figureName) {
        $.each(app.FIGURE_POSITION[figureName], function(color, positions) {

          positions.forEach(function(position) {
            app.figures.add(new app[figureName]({ color: color, position: position }));
          });

        });
      });

    },

    /**
     * adds figure from a collection
     * @param {object} figure - The figure to be added
     */
    addOne: function(figure) {
      // make view and assign figure model
      var temp_view = new app.FigureView({ model: figure });

      // add element to correct field on the board
      var temp_position = temp_view.model.get('position');
      $('.' + temp_position, this.el).append(temp_view.render().el);
    },



    /**
     * removes figure from a collection
     * @param {object} figure - The figure to be removed
     */
    removeOne: function(figure) {

      // Add to eaten container...
      var temp_view = new app.FigureView({ model: figure.clone() });
      this.eatenContainer.append(temp_view.render().el);

      // ... end destroy the model
      figure.destroy();
    },
    handleBodyClick: function (e) {
      if(e.target.tagName !== 'TD' && this.activeFigure && this.activeSquare){
        this.activeSquare.removeAttr('data-active'); // remove "active" attribute for styling
        this.activeSquare = this.activeFigure = null;
      }
    },

    /**
     * Square's "click" callback
     */
    handleSquareClick: function(e) {

      var fieldNote = $(e.target).attr('class'); // Get clicked square id
      var fieldFigure = app.figures.findWhere({ position: fieldNote }); // get figure on selected square

      if (this.activeFigure) {
        // this gets executed on second click!

        // disable eating own figure
        if (fieldFigure && (this.activeFigure.get('color') == fieldFigure.get('color'))) {
          return false;
        }

        // check if figure has moved or was it a false move
        var figureHasMoved = this.activeFigure.checkMovement($('.' + fieldNote), fieldFigure);

        if (figureHasMoved) {
          this.whitesTurn = !this.whitesTurn; // change turn
          this.turnIndicator.text(this.whitesTurn ? 'white' : 'black');
        }

        this.activeSquare.removeAttr('data-active'); // remove "active" attribute for styling
        this.activeSquare = this.activeFigure = null;

      } else {

        // exit if no element is selected on first click!
        if (!fieldFigure) {
          return false;
        }

        var figureColor = fieldFigure.get('color');

        if ((this.whitesTurn && figureColor == 'white') ||
          (!this.whitesTurn && figureColor == 'black')) {

          this.activeFigure = fieldFigure;
          this.activeSquare = $(e.target).attr('data-active', 'true'); // assign element and add "active" attribute for styling

        }
      }
    }
  });


    /**
   * Moves figure via console / websockets
   * @param {string} oldPos - position of tergeted figure 
   * @param {string} newPos - new posigion 
   */
  app.moveFigure = function(oldPos, newPos){
    var targetFigure = app.figures.where({ position: oldPos })[0];
    if(targetFigure) {
      targetFigure.set('position', newPos)
    }
  }
})(jQuery);
