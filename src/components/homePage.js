"use strict";

var React = require('react');

var Home = React.createClass({
    render: function() {
        return (
            <div className="jumbotron">
                <h1>Pluralsight Administration</h1>
                <p>Using React, React Router, and Flux for responsive web-apps</p>
            </div>
        );
    }
});

module.exports = Home;