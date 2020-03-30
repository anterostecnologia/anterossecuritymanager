import React, { Component } from 'react';
import {boundClass} from 'anteros-react-core';

@boundClass
class AnterosAdminLoader extends Component {
    render() {
        return (
            <div className="loader-bg">
                <div className="loader-track">
                    <div className="loader-fill" />
                </div>
            </div>
        );
    }
};

export default AnterosAdminLoader;

 