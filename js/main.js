//--------------------------
// File: main.js
// - set configs 
// - load templates files
// - initializes application
// -------------------------
require.config({
    paths: {
        'jquery': 'libs/jquery/jquery-1.7.1.min',
        'underscore': 'libs/underscore/underscore-min', 
        'backbone': 'libs/backbone/backbone-amd', // AMD support
        'templates': '../templates'
    },
	priority: ['jquery', 'underscore', 'backbone']
});

require([
    'domReady', // optional, using RequireJS domReady plugin
    'app'
], function(domReady, app){
    domReady(function () {
        console.log('domReady!');

        //load all templates dynamically using the text.js plugin
        var loadTemplates = require([
                'text!templates/item.html',
                'text!templates/stats.html'], function(){
            
                app.templates(arguments);
                app.initialize();

            });

    });
});



