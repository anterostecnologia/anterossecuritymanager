import React from 'react';
import { AnterosFormGroup } from 'anteros-react-containers';
import { AnterosLabel } from 'anteros-react-label';
import { AnterosEdit } from 'anteros-react-editors';
import AnterosReactComponent from './AnterosReactComponent';

export default class DescricaoField extends AnterosReactComponent {

    render() {
        return (
            <AnterosFormGroup>
                <AnterosLabel caption="Nome" small={this.props.labelSize} />
                <AnterosEdit
                    value=""
                    dataSource={this.props.dataSource}
                    dataField={this.props.dataField}
                    small={this.props.editSize}
                    maxLength={this.props.maxLength}
                    minLength = {this.props.minLength}
                />
            </AnterosFormGroup>
        );
    }
}

DescricaoField.defaultProps = {
    labelSize: 2,
    editSize: 8,
    minLength: 1
}