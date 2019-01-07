/*eslint-disable strict */ //disabled strict mode for this file since we need jQuery global variable

var React = require('react');
var Header = require('./common/header');
var RouteHandler = require('react-router').RouteHandler;
$ = jQuery = require('jQuery');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Header/>
                <div className="container-fluid">
                    <RouteHandler/>
                </div>
            </div>
        );
    }
});

module.exports = App;