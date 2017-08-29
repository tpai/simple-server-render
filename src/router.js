import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Router extends Component {
    static childContextTypes = {
        url: PropTypes.string
    }
    getChildContext() {
        return {
            url: this.props.url
        };
    }
    render() {
        const { children } = this.props;
        return(
            <div>
                {children.map(child => child)}
            </div>
        );
    }
}

export class Route extends Component {
  static contextTypes = {
    url: PropTypes.string
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
        pathname: context.url || window.__INIT_STATE__.url || location.pathname
    };
  }
  componentWillMount() {
    if (typeof window !== 'undefined') {
        register(this);
        window.addEventListener("popstate", this.handlePop);
    }
  }
  componentWillUnmount() {
    if (typeof window !== 'undefined') {
        unregister(this);
        window.removeEventListener("popstate", this.handlePop);
    }
  }
  componentWillUpdate() {
    if (typeof window !== 'undefined') {
        const pathname = location.pathname;
        if (this.state.pathname !== pathname)
        this.setState({ pathname: pathname });
    }
  }
  handlePop = () => {
    this.forceUpdate();
  }
  render() {
    const { pathname } = this.state;
    const { exact = false, path, comp } = this.props;
    const exp = `^${path}`;
    const match = new RegExp(exp, 'mg').exec(pathname);
    const isExact = path === pathname;

    if (!match) {
      return null;
    }

    if (exact && !isExact) {
      return null;
    }

    if (comp) {
      return React.createElement(comp);
    }
  }
}

const instances = [];
const register = route => instances.push(route);
const unregister = route => instances.splice(instances.indexOf(route), 1);

export const historyPush = path => {
  window.history.pushState({}, null, path);
  instances.forEach(instance => instance.forceUpdate());
};

export const historyReplace = path => {
  window.history.pushReplace({}, null, path);
  instances.forEach(instance => instance.forceUpdate());
};

export class Link extends Component {
  handleClick = e => {
    const { to, replace } = this.props;
    if (replace) {
      historyReplace(to);
    } else {
      historyPush(to);
    }
    e.preventDefault();
  }
  render() {
    const { to } = this.props;
    return (
      <div className="link">
          <a href={to} onClick={e => this.handleClick(e)}>
          {to}
        </a>
      </div>
    );
  }
}
