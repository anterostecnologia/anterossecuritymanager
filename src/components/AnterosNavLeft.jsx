import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import anterosWindowSize from './AnterosWindowSize';
import AnterosNavSearch from './AnterosNavSearch';
import {actionTypes} from "./AnterosAdminReducer";
import { boundClass } from 'anteros-react-core';

@boundClass
class AnterosNavLeft extends Component {

    render() {
        return (
            <Fragment>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item"><AnterosNavSearch/></li>
                </ul>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isFullScreen: state.isFullScreen,
        rtlLayout: state.rtlLayout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreen: () => dispatch({type: actionTypes.FULL_SCREEN}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(anterosWindowSize(AnterosNavLeft));
