import React, { Component } from 'react';
import { AnterosButton } from 'anteros-react-buttons';
import { AnterosRow, AnterosCol } from 'anteros-react-layout';

export default class SaveCancelButtons extends Component {

    render() {

        return (
            <AnterosRow className={"justify-content-end align-items-start"} style={{padding:'8px'}}>
                <AnterosCol
                    small={{
                        size: 2
                    }}
                >

                    <AnterosButton
                        id="btnSave"
                        route={this.props.routeSave}
                        style={{

                            marginRight: '8px'
                        }}
                        disabled={this.props.disabled}
                        icon="fa fa-floppy-o"
                        success
                        caption="Salvar"
                        onButtonClick={this.props.onButtonClick}
                    />
                    <AnterosButton
                        id="btnCancel"
                        route={this.props.routeCancel}
                        disabled={this.props.disabled}
                        icon="fa fa-ban"
                        danger
                        caption="Cancelar"
                        onButtonClick={this.props.onButtonClick}
                    />
                </AnterosCol>
            </AnterosRow>
        )
    }
}

SaveCancelButtons.defaultProps = {
    disabled: false
}