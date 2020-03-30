import React, { Component } from 'react';
import { WithTableContainerTemplate } from 'anteros-react-template';
import { actions } from '../redux/modules/perfis';
import { Resources, EndPoints } from '../service/Resources';
import { QueryFields, QueryField } from 'anteros-react-querybuilder';
import { Columns, AnterosDataTableColumn } from 'anteros-react-table';
import { boundClass } from 'anteros-react-core';

@WithTableContainerTemplate({
    resource: Resources.GRUPO,
    reducerName: 'gruposReducer',
    userReducerName: 'authenticationReducer',
    actions: actions,
    endPoints: EndPoints,
    openDataSourceFilter: true,
    openMainDataSource: true,
    pageSize: 20,
    quickFilterWidth: '50%',
    viewName: 'GruposView',
    caption: 'Grupos',
    filterName: 'filtroGrupos',
    messageLoading: 'Por favor aguarde...',
    routes: {
        add: '/home/seguranca/grupo/adicionar',
        edit: '/home/seguranca/grupo/editar',
        close: '/home/default'
    }
})
@boundClass
class GruposView extends Component {

    onAfterInsert() {
        
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
                    label="Nome grupo"
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
                    title="Nome do grupo"
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

export default GruposView;