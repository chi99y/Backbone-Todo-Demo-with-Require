//------------------------------
// File: appView.js
// - main application view that 
//   extends Backbone.js Views
// -----------------------------
define([
	'jquery',
	'underscore',
	'backbone',
	'model/todo',
	'collections/todoList',
	'view/toDoView',
], function($, _, Backbone, Todo, TodoList, TodoView) {

	// Our overall **AppView** is the top-level piece of UI.
	var AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
	    // the App already present in the HTML.
	    el: $("#todoapp"),

		// Delegated events for creating new items, and clearing completed ones.
	    events: {
	      "keypress #new-todo":  "createOnEnter",
	      "keyup #new-todo":     "showTooltip",
	      "click .todo-clear a": "clearCompleted"
	    },
	
		Todos: new TodoList(),

	    // At initialization we bind to the relevant events on the `Todos`
	    // collection, when items are added or changed. Kick things off by
	    // loading any preexisting todos that might be saved in *localStorage*.
	    initialize: function() {
		  //input field
		  this.input    = this.$("#new-todo");

	      this.Todos.bind('add',   this.addOne, this);
	      this.Todos.bind('reset', this.addAll, this);
	      this.Todos.bind('all',   this.render, this);

	      this.Todos.fetch();
	    },

	    // Re-rendering the App just means refreshing the statistics -- the rest
	    // of the app doesn't change.
	    render: function() {
	      //use underscore template--can explore other templating systems
	      var template = _.template($('#stats-template').html());

	      //render with data
	      this.$('#todo-stats').html(template({
	        total:      this.Todos.length,
	        done:       this.Todos.done().length,
	        remaining:  this.Todos.remaining().length
	      }));
	    },

	    // Add a single todo item to the list by creating a view for it, and
	    // appending its element to the `<ul>`.
	    addOne: function(todo) {
	      var view = new TodoView({model: todo});
	      this.$("#todo-list").append(view.render().el);
	    },

	    // Add all items in the **Todos** collection at once.
	    addAll: function() {
	      this.Todos.each(this.addOne);
	    },

	    // If you hit return in the main input field, and there is text to save,
	    // create new **Todo** model persisting it to *localStorage*.
	    createOnEnter: function(e) {
	      var text = this.input.val();
	      if (!text || e.keyCode != 13) return;
	      this.Todos.create({text: text, order: this.Todos.nextOrder()});
	      this.input.val('');
	    },

	    // Clear all done todo items, destroying their models.
	    clearCompleted: function() {
	      _.each(this.Todos.done(), function(todo){ todo.destroy(); });
	      return false;
	    },

	    // Lazily show the tooltip that tells you to press `enter` to save
	    // a new todo item, after one second.
	    showTooltip: function(e) {
	      var tooltip = this.$(".ui-tooltip-top");
	      var val = this.input.val();
	      tooltip.fadeOut();
	      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
	      if (val == '' || val == this.input.attr('placeholder')) return;
	      var show = function(){ tooltip.show().fadeIn(); };
	      this.tooltipTimeout = _.delay(show, 1000);
	    }

	});
	
	return AppView;
	
});