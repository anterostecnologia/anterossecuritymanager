import React from 'react';
import { withRouter } from 'react-router';
import { boundClass } from 'anteros-react-core';

@boundClass
class AnterosScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children
    }
}

export default withRouter(AnterosScrollToTop);