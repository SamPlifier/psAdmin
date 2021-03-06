"use strict";
var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
    statics: {
        willTransitionFrom: function(transition, component) {
            var blankForm = component.state.author.firstName.length === 0 && component.state.author.lastName.length === 0;
            if (component.state.dirty && !blankForm && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }
    },
    mixins: [
        Router.Navigation
    ],
    getInitialState: function() {
        return {
            author: { id: '', firstName: '', lastName: '' },
            errors: {},
            dirty: false
        };
    },
    setAuthorState: function(event) {
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },
    authorFormIsValid: function() {
        var formIsValid = true;
        this.state.errors = {};//clear any previous errors
        if (this.state.author.firstName.length < 2) {
            this.state.errors.firstName = 'First name must be at least 2 characters.';
            formIsValid = false;
        }
        if (this.state.author.lastName.length < 2) {
            this.state.errors.lastName = 'Last name must be at least 2 characters.';
            formIsValid = false;
        }
        this.setState({errors: this.state.errors});
        return formIsValid;
    },
    saveAuthor: function(event) {
        event.preventDefault();
        if (!this.authorFormIsValid()) {
            return;
        }
        if (this.state.author.id) {
            AuthorActions.updateAuthor(this.state.author);
        } else {
            AuthorActions.createAuthor(this.state.author);
        }
        this.setState({dirty: false});
        toastr.success('Author saved.');
        this.transitionTo('authors');
    },
    componentWillMount: function() {
        var authorId = this.props.params.id; // from the path '/author:id'
        if (authorId) {
            this.setState({author: AuthorStore.getAuthorById(authorId)});//if there's an author in the url param, populate initial state author
        }
    },
    render: function() {
        return (
            <AuthorForm
            author={this.state.author}
            onChange={this.setAuthorState}
            onSave={this.saveAuthor}
            errors={this.state.errors} />
        );
    }
});

module.exports = ManageAuthorPage;
