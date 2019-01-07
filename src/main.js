"use strict";
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

Router.run(routes,/* Router.HistoryLocation,*/ function(Handler) { // add 2nd param to Router.run for no # urls- called history Urls
    React.render(<Handler />, document.getElementById('app'));
});
