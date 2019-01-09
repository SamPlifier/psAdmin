"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _authors = [];//private variable- not exported out of module so only way to change data in store is with methods in AuthorStore

// take an empty new object, extend it to use event emitter capabilities
//AuthorStore is the public API for our store
var AuthorStore = assign({}, EventEmitter.prototype, {
    // addChangeListener, removeChangeListener & emitChange give store ability to interact with React components
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    getAllAuthors: function() {
        return _authors;
    },
    getAuthorById: function(id) {
        return _.find(_authors, {id: id});
    }
});

Dispatcher.register(function(action) {
    switch(action.actionType) {
        case ActionTypes.CREATE_AUTHOR:
            _authors.push(action.author);
            AuthorStore.emitChange();
    }
});

module.exports = AuthorStore;
