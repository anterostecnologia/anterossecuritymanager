import React, { Component } from 'react';
import { WithTableContainerTemplate } from 'anteros-react-template';
import { actions } from '../redux/modules/recursos';
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
    resource: Resources.RECURSO,
    reducerName: 'recursosReducer',
    userReducerName: 'authenticationReducer',
    actions: actions,
    endPoints: EndPoints,
    openDataSourceFilter: true,
    openMainDataSource: true,
    pageSize: PAGE_SIZE,
    defaultSortFields: 'name',
    quickFilterWidth: '50%',
    viewName: 'RecursosView',
    caption: 'Serviços',
    filterName: 'filtroRecursos',
    messageLoading: 'Por favor aguarde...',
    routes: {
        add: '/home/recurso/servico/adicionar',
        edit: '/home/recurso/servico/editar',
        close: '/home/default'
    }
})
@boundClass
class RecursosView extends Component {

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
                return EndPoints.POST(Resources.RECURSO, entity, this.getUser());
            });
            dataSource.setValidatePostResponse(response => {
                return response.data !== undefined;
            });
            dataSource.setAjaxDeleteConfigHandler(entity => {
                return EndPoints.DELETE(Resources.RECURSO, entity, this.getUser());
            });
            dataSource.setValidateDeleteResponse(response => {
                return response.data !== undefined;
            });
        }
        return dataSource;
    }

    onAfterInsert() {
        this.dataSource.setFieldByName('owner', this.props.user.owner.id);
        this.dataSource.setFieldByName('system', this.props.system);
    }

    onFindAll(page, pageSize, sort, user, fieldsToForceLazy) {
        return EndPoints.FIND_RESOURCES_BY_SYSTEM(this.props.system.name, Resources.RECURSO, page, pageSize, sort, user, fieldsToForceLazy)
    }

    onFindMultipleFields(filter, fields, page, pageSize, sort, user, fieldsToForceLazy) {
        return EndPoints.FIND_MULTIPLE_FIELDS_WITH_SYSTEM(this.props.system.name, Resources.RECURSO, filter, fields, page, pageSize, sort, user, fieldsToForceLazy)
    }

    onFindWithFilter(filter, page, pageSize, sort, user, fieldsToForceLazy) {
        return EndPoints.FIND_WITH_FILTER_WITH_SYSTEM(this.props.system.name,this.props.system.id, Resources.RECURSO, filter, page, pageSize, user, fieldsToForceLazy, sort)
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
                    label="Nome do serviço"
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
                    width="15%"
                    titleAlign="center"
                    align="right"
                    dataType="number"
                />
                <AnterosDataTableColumn
                    dataField="name"
                    title="Nome do serviço"
                    width="45%"
                />
                <AnterosDataTableColumn
                    dataField="description"
                    title="Descrição"
                    width="40%"
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

export default connect(mapStateToProps, null)(RecursosView);

