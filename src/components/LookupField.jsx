import React, { Component } from 'react';
import { AnterosLabel } from 'anteros-react-label';
import { AnterosFormGroup, AnterosInputGroup, AnterosInputGroupAddOn } from 'anteros-react-containers';
import { AnterosLookupNumber, AnterosEdit } from 'anteros-react-editors';
import { AnterosButton } from 'anteros-react-buttons';


export default class LookupField extends Component {
    render() {
        return (
            <AnterosFormGroup>
                <AnterosLabel caption={this.props.caption} small={this.props.labelSize} />
                <AnterosInputGroup small={this.props.lookupSize}>
                    <AnterosLookupNumber
                        precision={0}
                        thousandsSeparator=""
                        userData={`lookup${this.props.name}`}
                        decimalSeparator=""
                        allowNegative={false}
                        dataSource={this.props.dataSource}
                        dataField={this.props.dataField}
                        lookupField={this.props.lookupField}
                        disabled={this.props.lookupState === `lookup${this.props.name}`}                     
                        onStartLookupData={this.props.onStartLookupData}
                        onFinishedLookupData={this.props.onFinishedLookupData}
                        onLookupData={this.props.onLookupData} 
                        onLookupResult={this.props.onLookupResult} 
                        onLookupDataError={this.props.onLookupDataError}
                        validateMessage={`${this.props.caption} {0} não encontrado.`}
                    />
                    <AnterosInputGroupAddOn>
                        <AnterosButton
                            id={`btnConsultar${this.props.name}`}
                            primary
                            disabled={this.props.lookupState === `lookup${this.props.name}`}
                            icon={
                                this.props.lookupState === `lookup${this.props.name}`
                                    ? 'fas fa-spinner fa-pulse'
                                    : 'fa fa-search'
                            }
                            dataUser={this.props.modalName}
                            onButtonClick={this.props.onButtonClick}
                        />
                    </AnterosInputGroupAddOn>
                </AnterosInputGroup>
                <AnterosEdit
                    small={this.props.descriptionSize}
                    disabled
                    dataSource={this.props.dataSource}
                    dataField={this.props.descriptionField}
                />
            </AnterosFormGroup>
        );
    }
}

LookupField.defaultProps = {
    labelSize: 2,
    lookupSize: 3,
    descriptionSize: 6,
}