import React, { Component } from 'react';
import AnterosLoginContainer2 from '../components/AnterosLoginContainer2';
import { autoBind } from 'anteros-react-core';

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onLoginSuccess(user) {
     this.props.history.push('/home/default');       
  }

  render() {
    return <AnterosLoginContainer2 onLoginSuccess={this.onLoginSuccess} />;
  }
}
