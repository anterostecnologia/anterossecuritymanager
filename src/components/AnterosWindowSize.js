import React, { Component } from 'react';

export default (ComposedComponent) => {

  class anterosWindowSize extends Component {

    constructor() {
      super();
      this.state = {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      };
    }

    handleResize() {
      // set initial state
      this.setState({
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      });
    }

    componentDidMount() {
      // bind window resize listeners
      this._handleResize = this.handleResize.bind(this);
      window.addEventListener('resize', this._handleResize);
      setTimeout(this._handleResize, 1000);
    }

    componentWillUnmount() {
      // clean up listeners
      window.removeEventListener('resize', this._handleResize);
    }

    getWrappedInstance() {
      return this.wrappedInstance;
    }

    render() {
      // pass window dimensions as props to wrapped component
      return (
        <ComposedComponent
          {...this.props}
          ref={c => { this.wrappedInstance = c; }}
          windowWidth={this.state.width}
          windowHeight={this.state.height}
        />
      );
    }

  }

  const composedComponentName = ComposedComponent.displayName
    || ComposedComponent.name
    || 'Component';

    anterosWindowSize.displayName = `anterosWindowSize(${composedComponentName})`;
  return anterosWindowSize;

};