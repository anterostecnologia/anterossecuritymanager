import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import anterosWindowSize from './AnterosWindowSize';
import AnterosNavIcon from "./AnterosNavIcon";
import AnterosNavBadge from "./AnterosNavBadge";
import {actionTypes} from "./AnterosAdminReducer";
import { boundClass } from 'anteros-react-core';

@boundClass
class AnterosNavItem extends Component {

    render() {
        let itemTitle = this.props.item.title;
        if (this.props.item.icon) {
            itemTitle = <span className="pcoded-mtext">{this.props.item.title}</span>;
        }

        let itemTarget = '';
        if (this.props.item.target) {
            itemTarget = '_blank';
        }

        let subContent;
        if(this.props.item.external) {
            subContent = (
                <a href={this.props.item.url} target='_blank' rel='noopener noreferrer'>
					<AnterosNavIcon items={this.props.item}/>
                    {itemTitle}
                    <AnterosNavBadge layout={this.props.layout} items={this.props.item}/>
				</a>
            );
        } else {
            subContent = (
                <NavLink to={this.props.item.url} className="nav-link" exact={true} target={itemTarget}>
                    <AnterosNavIcon items={this.props.item}/>
                    {itemTitle}
                    <AnterosNavBadge layout={this.props.layout} items={this.props.item}/>
                </NavLink>
            );
        }
        let mainContent = '';
        if (this.props.layout === 'horizontal') {
            mainContent = (
                <li onClick={this.props.onItemLeave}>{subContent}</li>
            );
        } else {
            if (this.props.windowWidth < 992) {
                mainContent = (
                    <li className={this.props.item.classes} onClick={this.props.onItemClick}>{subContent}</li>
                );
            } else {
                mainContent = (
                    <li className={this.props.item.classes}>{subContent}</li>
                );
            }
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
        collapseMenu: state.adminLayoutReducer.collapseMenu
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onItemClick: () => dispatch({type: actionTypes.COLLAPSE_MENU}),
        onItemLeave: () => dispatch({type: actionTypes.NAV_CONTENT_LEAVE})
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (anterosWindowSize(AnterosNavItem)));
