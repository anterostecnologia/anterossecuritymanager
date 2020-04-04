import React, { Component } from 'react';
import { WithTableContainerTemplate } from 'anteros-react-template';
import { actions } from '../redux/modules/acoes';
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

@WithTableContainerTemplate({
    resource: Resources.ACAO,
    reducerName: 'acaoReducer',
    userReducerName: 'authenticationReducer',
    actions: actions,
    endPoints: EndPoints,
    openDataSourceFilter: true,
    openMainDataSource: true,
    pageSize: PAGE_SIZE,
    defaultSortFields: 'resource.name, name',
    quickFilterWidth: '50%',
    viewName: 'AcoesView',
    caption: 'Ações',
    filterName: 'filtroAcoes',
    messageLoading: 'Por favor aguarde...',
    routes: {
        add: '/home/recurso/acao/adicionar',
        edit: '/home/recurso/acao/editar',
        close: '/home/default'
    }
})
@boundClass
class AcoesView extends Component {

    onCreateDatasource() {
        let dataSource;
        if (this.props.dataSource) {
            dataSource = this.props.dataSource;
            if (dataSource.getState() !== dataSourceConstants.DS_BROWSE) {
                dataSource.cancel();
            }
        } else {
            dataSource = new AnterosRemoteDatasource();
            dataSource.setAjaxPostConfigHandler(entity => {
                return EndPoints.POST(Resources.ACAO, entity, this.getUser());
            });
            dataSource.setValidatePostResponse(response => {
                return response.data !== undefined;
            });
            dataSource.setAjaxDeleteConfigHandler(entity => {
                return EndPoints.DELETE(Resources.ACAO, entity, this.getUser());
            });
            dataSource.setValidateDeleteResponse(response => {
                return response.data !== undefined;
            });
        }
        return dataSource;
    }

    onAfterInsert() {
        this.dataSource.setFieldByName('owner', this.props.user.owner.id);
    }

    onFindAll(page, pageSize, sort, user, fieldsToForceLazy) {
        return EndPoints.FIND_ACTIONS_BY_SYSTEM(this.props.system.name, Resources.ACAO, page, pageSize, sort, user, fieldsToForceLazy)
    }

    onFindMultipleFields(filter, fields, page, pageSize, sort, user, fieldsToForceLazy) {
        return EndPoints.FIND_MULTIPLE_FIELDS_WITH_SYSTEM(this.props.system.name, Resources.ACAO, filter, fields, page, pageSize, sort, user, fieldsToForceLazy)
    }

    onFindWithFilter(filter, page, pageSize, sort, user, fieldsToForceLazy) {
        return EndPoints.FIND_WITH_FILTER_WITH_SYSTEM(this.props.system.name,this.props.system.id, Resources.ACAO, filter, page, pageSize, user, fieldsToForceLazy, sort)
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
                    label="Nome da ação"
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
                    dataField="resource.id"
                    title="Id. recurso"
                    width="10%"
                    titleAlign="center"
                    align="right"
                    dataType="number"
                />
                <AnterosDataTableColumn
                    dataField="resource.name"
                    title="Nome do recurso"
                    width="30%"
                />
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
                    title="Nome da ação"
                    width="20%"
                />
                <AnterosDataTableColumn
                    dataField="description"
                    title="Descrição"
                    width="30%"
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

export default connect(mapStateToProps, null)(AcoesView);

