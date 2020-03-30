import React, { Component, Fragment } from 'react';
import { AnterosRow, AnterosCol } from 'anteros-react-layout';
import { actions } from '../redux/modules/acoes';
import { boundClass } from 'anteros-react-core';
import { Resources, EndPoints } from '../service/Resources';
import { WithFormTemplate } from 'anteros-react-template';
import DescricaoField from '../components/DescricaoField';
import NameField from '../components/NameField';
import IdentificadorField from '../components/IdentificadorField';
import SaveCancelButtons from '../components/SaveCancelButtons';
import LookupField from '../components/LookupField';
import axios from 'axios';

const loadingProps = {
    resource: Resources.ACAO,
    reducerName: 'acoesReducer',
    userReducerName: 'authenticationReducer',
    actions: actions,
    endPoints: EndPoints,
    formName: 'AcoesForm',
    caption: 'Ações',
    messageLoading: 'Por favor aguarde...',
    routes: {
        save: '/home/recurso/acao/consulta',
        cancel: '/home/recurso/acao/consulta',
        close: '/home/recurso/acao/consulta'
    }
};

@WithFormTemplate(loadingProps)
@boundClass
class AcoesForm extends Component {

    constructor(props) {
        super(props);
        this.state = { lookup: '' };
    }

    onLookupResouce(value) {
        let _this = this;
        return new Promise(function (resolve, reject) {
            axios(EndPoints.FIND_ONE(Resources.RECURSO, value, _this.props.user, ''))
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    }

    onStartLookupData(item) {
        this.setState({
            ...this.state,
            lookup: item.props.userData
        });
    }

    onFinishedLookupData(item) {
        this.setState({
            ...this.state,
            lookup: ''
        });
    }

    onLookupError(error) {
        this.setState({
            ...this.state,
            alertIsOpen: true,
            alertMessage: error
        });
    }

    render() {
        return (
            <Fragment>
                <AnterosRow>
                    <AnterosCol small={12}>
                        <IdentificadorField dataSource={this.props.dataSource}
                            dataField="id" />
                        <NameField
                            dataSource={this.props.dataSource}
                            dataField="name" editSize={4} />    
                        <DescricaoField
                            dataSource={this.props.dataSource}
                            dataField="description" editSize={6} />
                        <DescricaoField
                            caption="Categoria"
                            dataSource={this.props.dataSource}
                            dataField="category" editSize={3} />
                        <LookupField caption="Recurso" name="Recurso" dataSource={this.props.dataSource}
                                dataField="catalogo" lookupField="resource.id" descriptionField="resouce.description" onStartLookupData={this.onStartLookupData}
                                lookupState={this.state.lookup}
                                lookupSize={2}
                                onFinishedLookupData={this.onFinishedLookupData}
                                onLookupData={this.onLookupRecurso}
                                onLookupDataError={this.onLookupError} modalName="modalConsultaRecurso"
                                onButtonClick={this.onClick} />
                    </AnterosCol>
                </AnterosRow>
                <SaveCancelButtons onButtonClick={this.props.onButtonClick} routeSave={this.props.loadingProps.routes.cancel} routeCancel={this.props.loadingProps.routes.cancel} />
            </Fragment >);
    }
}

export default AcoesForm;