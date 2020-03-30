import React, { Component, Fragment } from 'react';
import anterosWindowSize from './AnterosWindowSize';
import config from '../config';
import { boundClass } from 'anteros-react-core';

@boundClass
class AnterosNavSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: false
        };
    }

    render() {
        const searchSyle = this.state.isSearch ? 'block' : 'none';
        return (
            <Fragment>
                <a href={config.BLANK_LINK} className="pop-search" onClick={() => this.setState(prevState => { return { isSearch: !prevState.isSearch } })}><i className="feather icon-search" /></a>
                <div className="search-bar" style={{ display: searchSyle }}>
                    <input type="text" className="form-control border-0 shadow-none" placeholder="Search hear" />
                    <button type="button" className="close" aria-label="Close" onClick={() => this.setState(prevState => { return { isSearch: !prevState.isSearch } })}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </Fragment>
        );
    }
}

export default anterosWindowSize(AnterosNavSearch);