var app = app || {};

(function($) {
  'use strict';

  // --------------
  // Resume View
  // --------------

  app.FigureView = Backbone.View.extend({

    tagName: 'span',
    template: _.template($('#figure-template').html()),

    // The ResumeView listens for changes to its model, re-rendering.
    initialize: function() {

      this.listenTo(this.model, 'change', this.change);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {

      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    change: function() {
      this.$el.remove();
      $('.' + this.model.get('position')).append(this.render().el);
    },

    // Remove the item, destroy the model and delete its view.
    clear: function() {
      this.model.destroy();
    }
  });

})(jQuery);
