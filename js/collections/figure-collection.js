/*global Backbone */
var app = app || {};

(function() {
  'use strict';

  /**
   * Figures Collection 
   */

  var Figures = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: app.Figure

  });

  // Create global collection "figures"
  app.figures = new Figures();

})();
