import React, { Component, Fragment, Suspense } from 'react';
import axios from 'axios';
import './assets/scss/asm.scss';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Anteros } from 'anteros-react-core';
import { asmBaseURL } from './constantes';
import AnterosAdminLoader from './components/AnterosAdminLoader';
import Loadable from 'react-loadable';
import AnterosScrollToTop from './components/AnterosScrollToTop';
const AnterosAdminLayout = Loadable({
  loader: () => import('./components/AnterosAdminLayout'),
  loading: AnterosAdminLoader
});

const LoginView = Loadable({
  loader: () => import('./containers/LoginView'),
  loading: AnterosAdminLoader
});


axios.defaults.baseURL = asmBaseURL;
Anteros.dataSourceDatetimeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';


class App extends Component {
    render() {
      const { authenticated } = this.props;
        
        return (
            <Fragment>
                <AnterosScrollToTop>
                    <Suspense fallback={<AnterosAdminLoader/>}>
                        <Switch>                           
                            <Route
                              exact
                              path="/"
                              render={() => <Redirect to="/home/default" push={true} />}
                            />
                            <Route
                              path="/home"
                              component={AnterosAdminLayout}
                              allowAccess={authenticated}
                            />
                            <Route path="/login" component={LoginView}/>
                        </Switch>
                    </Suspense>
                </AnterosScrollToTop>
            </Fragment>
        );
    }
}


const mapStateToProps = state => {
  return {
    user: state.authenticationReducer.user,
    authenticating: state.authenticationReducer.authenticating,
    authenticated: state.authenticationReducer.authenticated
  };
};

export default connect(
  mapStateToProps,
  null
)(App);


