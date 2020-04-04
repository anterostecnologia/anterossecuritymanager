import React, { Component, Fragment } from 'react';
import { AnterosRow, AnterosCol } from 'anteros-react-layout';
import { actions } from '../redux/modules/terminaisAcesso';
import { boundClass } from 'anteros-react-core';
import { Resources, EndPoints } from '../service/Resources';
import { WithFormTemplate } from 'anteros-react-template';
import DescricaoField from '../components/DescricaoField';
import NameField from '../components/NameField';
import IdentificadorField from '../components/IdentificadorField';
import SaveCancelButtons from '../components/SaveCancelButtons';

const loadingProps = {
    resource: Resources.TERMINALACESSO,
    reducerName: 'terminaisAcessoReducer',
    userReducerName: 'authenticationReducer',
    actions: actions,
    endPoints: EndPoints,
    formName: 'TerminaisAcessoForm',
    caption: 'Terminais de acesso',
    messageLoading: 'Por favor aguarde...',
    routes: {
        save: '/home/recurso/terminalacesso/consulta',
        cancel: '/home/recurso/terminalacesso/consulta',
        close: '/home/recurso/terminalacesso/consulta'
    }
};

@WithFormTemplate(loadingProps)
@boundClass
class TerminalAcessoForm extends Component {

    render() {
        return (
            <Fragment>
                <AnterosRow>
                    <AnterosCol small={12}>
                        <IdentificadorField dataSource={this.props.dataSource}
                            dataField="id" />
                        <NameField
                            dataSource={this.props.dataSource}
                            dataField="name" editSize={3}/>    
                        <DescricaoField
                            dataSource={this.props.dataSource}
                            dataField="description" editSize={3}/>
                        <DescricaoField
                            dataSource={this.props.dataSource}
                            caption="Endereço IP"
                            dataField="ipAddress" editSize={3}/>
                    </AnterosCol>
                </AnterosRow>
                <SaveCancelButtons onButtonClick={this.props.onButtonClick} routeSave={this.props.loadingProps.routes.cancel} routeCancel={this.props.loadingProps.routes.cancel} />
            </Fragment >);
    }
}

export default TerminalAcessoForm;