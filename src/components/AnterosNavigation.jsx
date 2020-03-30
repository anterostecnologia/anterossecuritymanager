import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import AnterosWindowSize from './AnterosWindowSize';
import AnterosNavContent from './AnterosNavContent';
import AnterosOutsideClick from './AnterosOutsideClick';
import {actionTypes} from './AnterosAdminReducer';
import navigation from '../menu-items';
import { boundClass } from 'anteros-react-core';

@boundClass
class AnterosNavigation extends Component {

    resize() {
        const contentWidth = document.getElementById('root').clientWidth;

        if (this.props.layout === 'horizontal' && contentWidth < 992) {
            this.props.onChangeLayout('vertical');
        }
    };

    componentDidMount() {
        this.resize();
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    scroll() {
        if (this.props.navFixedLayout && this.props.headerFixedLayout === false) {
            const el = document.querySelector('.pcoded-navbar.menupos-fixed');
            const scrollPosition = window.pageYOffset;
            if (scrollPosition > 60) {
                el.style.position = 'fixed';
                el.style.transition = 'none';
                el.style.marginTop = '0';
            } else {
                el.style.position = 'absolute';
                el.style.marginTop = '60px';
            }
        } else {
            document.querySelector('.pcoded-navbar').removeAttribute('style');
        }
    };

    render() {
        let navClass = [
            'pcoded-navbar',
        ];

        navClass = [
            ...navClass,
            this.props.layoutType
        ];

        if (this.props.layout === 'horizontal') {
            navClass = [...navClass, 'theme-horizontal'];
        } else {
            if (this.props.navFixedLayout) {
                navClass = [...navClass, 'menupos-fixed'];
            }

            if (this.props.navFixedLayout && !this.props.headerFixedLayout) {
                window.addEventListener('scroll', this.scroll, true);
                window.scrollTo(0, 0);
            } else {
                window.removeEventListener('scroll', this.scroll, false);
            }
        }

        if (this.props.windowWidth < 992 && this.props.collapseMenu) {
            navClass = [...navClass, 'mob-open'];
        } else if (this.props.collapseMenu) {
            navClass = [...navClass, 'navbar-collapsed'];
        }

        if (this.props.layoutType === 'dark') {
            document.body.classList.add('anteros-dark');
        } else {
            document.body.classList.remove('anteros-dark');
        }

        if (this.props.rtlLayout) {
            document.body.classList.add('anteros-rtl');
        } else {
            document.body.classList.remove('anteros-rtl');
        }

        if (this.props.boxLayout) {
            document.body.classList.add('container');
            document.body.classList.add('box-layout');
        } else {
            document.body.classList.remove('container');
            document.body.classList.remove('box-layout');
        }

        let navBarClass = ['navbar-wrapper'];
        if (this.props.layout === 'horizontal' && this.props.subLayout === 'horizontal-2') {
            navBarClass = [...navBarClass, 'container'];
        }

        let navContent = (
            <div className={navBarClass.join(' ')}>
                <AnterosNavContent navigation={navigation.items} />
            </div>
        );
        if (this.props.windowWidth < 992) {
            navContent = (
                <AnterosOutsideClick>
                    <div className="navbar-wrapper">
                        <AnterosNavContent navigation={navigation.items} />
                    </div>
                </AnterosOutsideClick>
            );
        }

        return (
            <Fragment>
                <nav className={navClass.join(' ')}>
                    {navContent}
                </nav>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        layout: state.adminLayoutReducer.layout,
        subLayout: state.adminLayoutReducer.subLayout,
        collapseMenu: state.adminLayoutReducer.collapseMenu,
        layoutType: state.adminLayoutReducer.layoutType,
        rtlLayout: state.adminLayoutReducer.rtlLayout,
        navFixedLayout: state.adminLayoutReducer.navFixedLayout,
        headerFixedLayout: state.adminLayoutReducer.headerFixedLayout,
        boxLayout: state.adminLayoutReducer.boxLayout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleNavigation: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
        onChangeLayout: (layout) => dispatch({type: actionTypes.CHANGE_LAYOUT, layout: layout}),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnterosWindowSize(AnterosNavigation)));
