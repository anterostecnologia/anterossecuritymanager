import React, { Component } from 'react';
import { AnterosFormGroup } from 'anteros-react-containers';
import { AnterosLabel } from 'anteros-react-label';
import { AnterosNumber } from 'anteros-react-editors';

export default class IdentificadorField extends Component {
    render() {
        return (
            <AnterosFormGroup>
                <AnterosLabel caption="Identificador" small={this.props.labelSize} />
                <AnterosNumber
                    dataSource={this.props.dataSource}
                    dataField={this.props.dataField}
                    small={this.props.editSize}
                    precision={0}
                    disabled
                />
            </AnterosFormGroup>
        );
    }
    
}
IdentificadorField.defaultProps = {
    labelSize: 2,
    editSize: 2
}