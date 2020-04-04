import React, { Component } from 'react';
import { WithTableContainerTemplate } from 'anteros-react-template';
import { actions } from '../redux/modules/perfis';
import { Resources, EndPoints } from '../service/Resources';
import { QueryFields, QueryField } from 'anteros-react-querybuilder';
import { Columns, AnterosDataTableColumn } from 'anteros-react-table';
import { boundClass } from 'anteros-react-core';
import { connect } from 'react-redux';

@WithTableContainerTemplate({
    resource: Resources.PERFIL,
    reducerName: 'perfisReducer',
    userReducerName: 'authenticationReducer',
    actions: actions,
    endPoints: EndPoints,
    openDataSourceFilter: true,
    openMainDataSource: true,
    pageSize: 20,
    quickFilterWidth: '50%',
    viewName: 'PerfisView',
    caption: 'Perfis',
    filterName: 'filtroPerfis',
    messageLoading: 'Por favor aguarde...',
    routes: {
        add: '/home/seguranca/perfil/adicionar',
        edit: '/home/seguranca/perfil/editar',
        close: '/home/default'
    }
})
@boundClass
class PerfisView extends Component {

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
                    label="Nome perfil"
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
                    title="Nome do perfil"
                    width="45%"
                />
                <AnterosDataTableColumn
                    dataField="description"
                    title="Descrição"
                    width="45%"
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

export default connect(mapStateToProps, null)(PerfisView);