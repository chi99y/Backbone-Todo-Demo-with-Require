//------------------------------
// File: todo.js
// - todo model that
//   extends Backbone.js Model
// -----------------------------
define([
	'underscore',
	'backbone'
], function(_,Backbone) {
	
		// Our basic **Todo** model has `text`, `order`, and `done` attributes.
		var Todo = Backbone.Model.extend({
			
			// Default attributes for a todo item.
		    defaults: function() {
		      return {
		        done:  false,
		        order: 0
		      };
		    },

		    // Toggle the `done` state of this todo item.
		    toggle: function() {
		      this.save({done: !this.get("done")});
		    }

		});
	
		return Todo;
	}
);