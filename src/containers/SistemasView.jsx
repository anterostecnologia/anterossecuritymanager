import React, { Component } from 'react';
import { WithTableContainerTemplate } from 'anteros-react-template';
import { actions } from '../redux/modules/sistemas';
import { Resources, EndPoints } from '../service/Resources';
import { QueryFields, QueryField } from 'anteros-react-querybuilder';
import { Columns, AnterosDataTableColumn } from 'anteros-react-table';
import { boundClass } from 'anteros-react-core';
import { connect } from 'react-redux';

@WithTableContainerTemplate({
    resource: Resources.SISTEMA,
    reducerName: 'systemReducer',
    userReducerName: 'authenticationReducer',
    actions: actions,
    endPoints: EndPoints,
    openDataSourceFilter: true,
    openMainDataSource: true,
    pageSize: 20,
    quickFilterWidth: '50%',
    viewName: 'SistemasView',
    caption: 'Sistemas',
    filterName: 'filtroSistemas',
    messageLoading: 'Por favor aguarde...',
    routes: {
        add: '/home/recurso/sistema/adicionar',
        edit: '/home/recurso/sistema/editar',
        close: '/home/default'
    }
})
@boundClass
class SistemasView extends Component {

    onAfterInsert() {
        this.dataSource.setFieldByName('owner', this.props.user.owner.id);
    }


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
                    label="Nome do sistema"
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
                    name="minimalVersion"
                    label="Versão mínima"
                    dataType="string"
                    sortable={true}
                    quickFilter={true}>
                </QueryField>
            </QueryFields>
        );
    }

    getColumns() {
        return (
            <Columns>
                <AnterosDataTableColumn
                    dataField="id"
                    title="ID"
                    width="10%"
                    titleAlign="center"
                    align="right"
                    dataType="number"
                />
                <AnterosDataTableColumn
                    dataField="name"
                    title="Nome do sistema"
                    width="35%"
                />
                <AnterosDataTableColumn
                    dataField="description"
                    title="Descrição"
                    width="35%"
                />
                <AnterosDataTableColumn
                    dataField="minimalVersion"
                    title="Versão mínima"
                    width="20%"
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

export default connect(mapStateToProps, null)(SistemasView);