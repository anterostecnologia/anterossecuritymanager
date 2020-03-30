import React, { Component, Fragment } from 'react';
import { boundClass } from 'anteros-react-core';
import { AnterosButton } from 'anteros-react-buttons';


@boundClass
class AnterosNavRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOpen: false
        };
    }

    render() {
        return (<Fragment>
            {this.props.children}
        </Fragment>
        );
    }
}

export default AnterosNavRight;
