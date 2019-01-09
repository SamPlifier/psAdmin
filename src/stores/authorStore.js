"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

// take an empty new object, extend it to use event emitter capabiliti
var AuthorStore = assign({}, EventEmitter.prototype, {
    // addChangeListener, removeChangeListener & emitChange give store ability to interact with React components
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },
    emitChange: function() {
        this.emit('change');
    }
});
