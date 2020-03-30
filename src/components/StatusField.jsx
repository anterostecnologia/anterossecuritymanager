import React, { Component } from 'react';
import { AnterosFormGroup } from 'anteros-react-containers';
import { AnterosLabel } from 'anteros-react-label';
import { AnterosCombobox, AnterosComboboxOption } from 'anteros-react-editors';
import { boundClass} from 'anteros-react-core';

@boundClass
class StatusField extends Component {
    constructor(props){
        super(props);
        this.state = {update: Math.random()};
    }
    renderValue(option) {
        if (option.value === 'ATIVO') {
            return (
                <strong style={{ backgroundColor: '#7cb342', color: '#fff' }}>
                    {option.label}
                </strong>
            );
        }

        else
            return (
                <strong style={{ backgroundColor: '#bf360c', color: '#fff' }}>
                    {option.label}
                </strong>
            );
    }

    onChangeValue(event){
        this.setState({update: Math.random()});
    }

    render(){
        let value = this.props.dataSource.fieldByName(this.props.dataField);
        let style = (value==='ATIVO'?{backgroundColor: '#7cb342', color: '#ffff'}:{backgroundColor: '#bf360c', color: '#ffff'});
        return (
            <AnterosFormGroup>  
                <AnterosLabel caption="Status" small={this.props.labelSize} />
                <AnterosCombobox
                    dataSource={this.props.dataSource}
                    dataField={this.props.dataField}
                    onChange={this.onChangeValue}
                    valueRenderer={this.renderValue}
                    optionRenderer={this.renderValue}
                    disabled={this.props.disabled}
                    style={style}
                    small={this.props.fieldSize}
                >
                    <AnterosComboboxOption label="ATIVO" value="ATIVO" />
                    <AnterosComboboxOption label="INATIVO" value="INATIVO" />
                </AnterosCombobox>
            </AnterosFormGroup>
        );
    }
}

StatusField.defaultProps = {
    labelSize : 2,
    fieldSize:  2,
    disabled: false
}


export default StatusField;