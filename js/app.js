//------------------------
// File: app.js
// - add templates to Dom
// - start application
// -----------------------
define(['jquery',  
		'underscore', 
		'backbone',
		'collections/todoList',
		'view/appView'], function($, _, Backbone, TodoList, AppView){

		// you can use $ and Backbone here with
        // dependencies loaded i.e. Underscore
	    return {

	    	//set the templates before we run the application
	    	templates: function(templArr){
	 			//add all the templates to the container as raw html
	    		for (var i=0; i<templArr.length; i++){

	    			$('#container').append(templArr[i]);
	    		}

	    		console.log('templates loaded!');
		    },
		    //start the application once templates are set
	        initialize: function(){
	 
				console.log('application init!');

				//create the main application view
				var mainView = new AppView();

	        }
	    };
});
