import React, { Component, Fragment } from 'react';
import { AnterosRow, AnterosCol } from 'anteros-react-layout';
import { actions } from '../redux/modules/horariosAcesso';
import { boundClass } from 'anteros-react-core';
import { Resources, EndPoints } from '../service/Resources';
import { WithFormTemplate } from 'anteros-react-template';
import DescricaoField from '../components/DescricaoField';
import IdentificadorField from '../components/IdentificadorField';
import SaveCancelButtons from '../components/SaveCancelButtons';

const loadingProps = {
    resource: Resources.HORARIO,
    reducerName: 'horariosAcessoReducer',
    userReducerName: 'authenticationReducer',
    actions: actions,
    endPoints: EndPoints,
    formName: 'HorariosAcessoForm',
    caption: 'Horários de acesso',
    messageLoading: 'Por favor aguarde...',
    routes: {
        save: '/home/recurso/horarioacesso/consulta',
        cancel: '/home/recurso/horarioacesso/consulta',
        close: '/home/recurso/horarioacesso/consulta'
    }
};

@WithFormTemplate(loadingProps)
@boundClass
class HorarioAcessoForm extends Component {

    render() {
        return (
            <Fragment>
                <AnterosRow>
                    <AnterosCol small={12}>
                        <IdentificadorField dataSource={this.props.dataSource}
                            dataField="id" />
                        <DescricaoField
                            dataSource={this.props.dataSource}
                            dataField="description" editSize={3}/>
                    </AnterosCol>
                </AnterosRow>
                <SaveCancelButtons onButtonClick={this.props.onButtonClick} routeSave={this.props.loadingProps.routes.cancel} routeCancel={this.props.loadingProps.routes.cancel} />
            </Fragment >);
    }
}

export default HorarioAcessoForm;