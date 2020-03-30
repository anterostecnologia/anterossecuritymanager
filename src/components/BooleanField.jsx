import React, { Component } from 'react';
import { AnterosFormGroup } from 'anteros-react-containers';
import { AnterosLabel } from 'anteros-react-label';
import { AnterosCheckbox } from 'anteros-react-editors';

export default class BooleanField extends Component {

    render() {
        return (
            <AnterosFormGroup>
                <AnterosLabel caption={this.props.caption} small={this.props.labelSize} />
                <AnterosCheckbox
                    dataField={this.props.dataField}
                    dataSource={this.props.dataSource}
                    valueChecked={true}
                    valueUnchecked={false}
                    small={1}
                    value=""                />
            </AnterosFormGroup>
        );
    }
}

BooleanField.defaultProps = {
    labelSize: 10
}





