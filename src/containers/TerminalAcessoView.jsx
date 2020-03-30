import React, { Component } from 'react';
import { WithTableContainerTemplate } from 'anteros-react-template';
import { actions } from '../redux/modules/terminaisAcesso';
import { Resources, EndPoints } from '../service/Resources';
import { QueryFields, QueryField } from 'anteros-react-querybuilder';
import { Columns, AnterosDataTableColumn } from 'anteros-react-table';
import { boundClass } from 'anteros-react-core';
import { connect } from 'react-redux';
import {
    AnterosRemoteDatasource,
    dataSourceConstants
} from 'anteros-react-datasource';

const PAGE_SIZE = 20;
const START_PAGE = 0;

@WithTableContainerTemplate({
    resource: Resources.TERMINALACESSO,
    reducerName: 'terminaisAcessoReducer',
    userReducerName: 'authenticationReducer',
    actions: actions,
    endPoints: EndPoints,
    openDataSourceFilter: true,
    openMainDataSource: true,
    pageSize: PAGE_SIZE,
    defaultSortFields: 'name',
    quickFilterWidth: '50%',
    viewName: 'TerminaisAcessoView',
    caption: 'Terminais de acesso',
    filterName: 'filtroTerminais',
    messageLoading: 'Por favor aguarde...',
    routes: {
        add: '/home/recurso/terminalacesso/adicionar',
        edit: '/home/recurso/terminalacesso/sistema/editar',
        close: '/home/default'
    }
})
@boundClass
class TerminalAcessoView extends Component {


    getFieldsFilter() {
        return (
            <QueryFields>
                <QueryField
                    name="id"
                    label="ID"
                    dataType="number"
                    quickFilter={true}
                    sortable={true}
                />
                <QueryField
                    name="name"
                    label="Nome do terminal"
                    quickFilter={true}
                    quickFilterSort={false}
                    sortable={true}
                />
                <QueryField
                    name="description"
                    label="Descrição"
                    quickFilter={true}
                    quickFilterSort={false}
                    sortable={true}
                />
                <QueryField
                    name="ipAddress"
                    label="Endereço IP"
                    quickFilter={true}
                    quickFilterSort={false}
                    sortable={true}
                />
            </QueryFields>
        );
    }

    getColumns() {
        return (
            <Columns>
                <AnterosDataTableColumn
                    dataField="id"
                    title="ID"
                    width="15%"
                    titleAlign="center"
                    align="right"
                    dataType="number"
                />
                <AnterosDataTableColumn
                    dataField="name"
                    title="Nome terminal"
                    width="35%"
                />
                <AnterosDataTableColumn
                    dataField="description"
                    title="Descrição"
                    width="35%"
                />
                <AnterosDataTableColumn
                    dataField="ipAddress"
                    title="Endereço IP"
                    width="15%"
                />
            </Columns>
        );
    }

    render() {
        return null;
    }
}



const mapStateToProps = state => {
    return {
        user: state.authenticationReducer.user,
        authenticated: state.authenticationReducer.authenticated,
        system: state.sistemasAdminReducer.activeSystem
    }
};

export default connect(mapStateToProps, null)(TerminalAcessoView);

