import React, { Component } from 'react';
import { Router, Route, Link } from './router';

export default class App extends Component {
    render() {
        return (
            <div>
                <Link to="/" />
                <Link to="/about" />
                <Link to="/contact" />
                <Router url={this.props.url}>
                    <Route exact path="/" comp={Home} />
                    <Route path="/about" comp={About} />
                    <Route path="/contact" comp={Contact} />
                </Router>
            </div>
        );
    }
}

const Home = () => (<h1>Home</h1>);
const About = () => (<h1>About</h1>);
const Contact = () => (<h1>Contact</h1>);
