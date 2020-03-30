import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from "../config";
import {actionTypes} from "./AnterosAdminReducer";
import AnterosNavIcon from './AnterosNavIcon';
import AnterosNavBadge from './AnterosNavBadge';
import AnterosNavItem from "./AnterosNavItem";
import AnterosLoopNavCollapse from './AnterosNavCollapse';
import {boundClass} from 'anteros-react-core';

@boundClass
class AnterosNavCollapse extends Component {

    componentDidMount() {
        const currentIndex = ((document.location.pathname).toString().split('/')).findIndex(id => id === this.props.collapse.id);
        if (currentIndex > -1) {
            this.props.onCollapseToggle(this.props.collapse.id, this.props.type);
        }
    }

    render() {
        const {isOpen, isTrigger} = this.props;

        let navItems = '';
        if (this.props.collapse.children) {
            const collapses = this.props.collapse.children;
            navItems = Object.keys(collapses).map(item => {
                item = collapses[item];
                switch (item.type) {
                    case 'collapse':
                        return <
                            AnterosLoopNavCollapse key={item.id} collapse={item} type="sub" />;
                    case 'item':
                        return <AnterosNavItem layout={this.props.layout} key={item.id} item={item}/>;
                    default:
                        return false;
                }
            });
        }

        let itemTitle = this.props.collapse.title;
        if (this.props.collapse.icon) {
            itemTitle = <span className="pcoded-mtext">{this.props.collapse.title}</span>;
        }

        let navLinkClass = ['nav-link'];

        let navItemClass = ['nav-item', 'pcoded-hasmenu'];
        const openIndex = isOpen.findIndex(id => id === this.props.collapse.id);
        if (openIndex > -1) {
            navItemClass = [...navItemClass, 'active'];
            if (this.props.layout !== 'horizontal') {
                navLinkClass = [...navLinkClass, 'active'];
            }
        }

        const triggerIndex = isTrigger.findIndex(id => id === this.props.collapse.id);
        if (triggerIndex > -1) {
            navItemClass = [...navItemClass, 'pcoded-trigger'];
        }

        const currentIndex = ((document.location.pathname).toString().split('/')).findIndex(id => id === this.props.collapse.id);
        if (currentIndex > -1) {
            navItemClass = [...navItemClass, 'active'];
            if (this.props.layout !== 'horizontal') {
                navLinkClass = [...navLinkClass, 'active'];
            }
        }

        const subContent = (
            <Fragment>
                <a href={config.BLANK_LINK} className={navLinkClass.join(' ')} onClick={() => this.props.onCollapseToggle(this.props.collapse.id, this.props.type)}>
                    <AnterosNavIcon items={this.props.collapse} />
                    {itemTitle}
                    <AnterosNavBadge layout={this.props.layout} items={this.props.collapse} />
                </a>
                <ul className="pcoded-submenu">
                    {navItems}
                </ul>
            </Fragment>
        );
        let mainContent = '';
        if (this.props.layout === 'horizontal') {
            mainContent = (
                <li className={navItemClass.join(' ')} onMouseLeave={() => this.props.onNavCollapseLeave(this.props.collapse.id, this.props.type)} onMouseEnter={() => this.props.onCollapseToggle(this.props.collapse.id, this.props.type)}>
                    {subContent}
                </li>
            );
        } else {
            mainContent = (
                <li className={navItemClass.join(' ')}>
                    {subContent}
                </li>
            );
        }

        return (
            <Fragment>
                {mainContent}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        layout: state.adminLayoutReducer.layout,
        isOpen: state.adminLayoutReducer.isOpen,
        isTrigger: state.adminLayoutReducer.isTrigger
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onCollapseToggle: (id, type) => dispatch({type: actionTypes.COLLAPSE_TOGGLE, menu: {id: id, type: type}}),
        onNavCollapseLeave: (id, type) => dispatch({type: actionTypes.NAV_COLLAPSE_LEAVE, menu: {id: id, type: type}})
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AnterosNavCollapse));
