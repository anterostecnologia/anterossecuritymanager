import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import anterosWindowSize from './AnterosWindowSize';
import AnterosNavLeft from "./AnterosNavLeft";
import AnterosNavRight from "./AnterosNavRight";
import {actionTypes} from "./AnterosAdminReducer";
import config from "../config";
import logo from '../assets/img/AnterosTecnologia-white@0.25x.png';
import {boundClass} from 'anteros-react-core';

@boundClass
class AnterosNavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            rightToggle: false
        };
    }
    
    render() {
        let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg', 'header-blue'];

        document.body.classList.remove('background-blue');
        document.body.classList.remove('background-red');
        document.body.classList.remove('background-purple');
        document.body.classList.remove('background-info');
        document.body.classList.remove('background-green');
        document.body.classList.remove('background-dark');

        document.body.classList.remove('background-grd-blue');
        document.body.classList.remove('background-grd-red');
        document.body.classList.remove('background-grd-purple');
        document.body.classList.remove('background-grd-info');
        document.body.classList.remove('background-grd-green');
        document.body.classList.remove('background-grd-dark');

        document.body.classList.remove('background-img-1');
        document.body.classList.remove('background-img-2');
        document.body.classList.remove('background-img-3');
        document.body.classList.remove('background-img-4');
        document.body.classList.remove('background-img-5');
        document.body.classList.remove('background-img-6');
        document.body.classList.add(this.props.headerBackColor);

        if (this.props.headerFixedLayout) {
            headerClass = [...headerClass, 'headerpos-fixed'];
        }

        let toggleClass = ['mobile-menu'];
        if (this.props.collapseMenu) {
            toggleClass = [...toggleClass, 'on'];
        }

        let mainLogo = logo;

        let navHtml;
        if(!this.state.rightToggle && this.props.windowWidth < 992) {
            navHtml = ''
        } else {
            navHtml = (
                <div className="collapse navbar-collapse d-flex">
                    {this.props.children}
                </div>
            );
        }

        let navBar = (
            <Fragment>
                <div className="m-header">
                    <a className={toggleClass.join(' ')} id="mobile-collapse1" href={config.BLANK_LINK} onClick={this.props.onToggleNavigation}><span/></a>
                    <a href={config.BLANK_LINK} className="b-brand">
                        <img id="main-logo" src={mainLogo} alt="" className="logo"/>
                    </a>
                    <a className="mob-toggler" href={config.BLANK_LINK} onClick={() => this.setState(prevState => {return {rightToggle: !prevState.rightToggle}})}><i className="feather icon-more-vertical"/></a>
                </div>
                {navHtml}
            </Fragment>
        );

        if (this.props.layout === 'horizontal' && this.props.subLayout === 'horizontal-2') {
            navBar = (
                <div className="container">
                    {navBar}
                </div>
            );
        }

        return (
            <Fragment>
                <header className={headerClass.join(' ')}>
                    {navBar}
                </header>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        rtlLayout: state.adminLayoutReducer.rtlLayout,
        headerBackColor: state.adminLayoutReducer.headerBackColor,
        headerFixedLayout: state.adminLayoutReducer.headerFixedLayout,
        collapseMenu: state.adminLayoutReducer.collapseMenu,
        layout: state.adminLayoutReducer.layout,
        subLayout: state.adminLayoutReducer.subLayout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleNavigation: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
    }
};


export default connect(mapStateToProps, mapDispatchToProps) (anterosWindowSize(AnterosNavBar));
