import React, { Component } from 'react';
import { WithTableContainerTemplate } from 'anteros-react-template';
import { actions } from '../redux/modules/horariosAcesso';
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
    resource: Resources.HORARIO,
    reducerName: 'horariosAcessoReducer',
    userReducerName: 'authenticationReducer',
    actions: actions,
    endPoints: EndPoints,
    openDataSourceFilter: true,
    openMainDataSource: true,
    pageSize: PAGE_SIZE,
    defaultSortFields: 'description',
    quickFilterWidth: '50%',
    viewName: 'HorarioAcessoView',
    caption: 'Horários de acesso',
    filterName: 'filtroHorariosAcesso',
    messageLoading: 'Por favor aguarde...',
    routes: {
        add: '/home/recurso/horarioacesso/adicionar',
        edit: '/home/recurso/horarioacesso/editar',
        close: '/home/default'
    }
})
@boundClass
class HorarioAcessoView extends Component {

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
                    width="15%"
                    titleAlign="center"
                    align="right"
                    dataType="number"
                />
                <AnterosDataTableColumn
                    dataField="description"
                    title="Descrição"
                    width="85%"
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

export default connect(mapStateToProps, null)(HorarioAcessoView);

