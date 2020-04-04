import React, { Component, Fragment } from 'react';
import { AnterosDataTableColumn, Columns } from 'anteros-react-table';
import { QueryFields, QueryField } from 'anteros-react-querybuilder';
import { actions } from '../redux/modules/acoesConsulta';
import { boundClass } from 'anteros-react-core';
import { Resources, EndPoints } from '../service/Resources';
import { WithSearchModalTemplate } from 'anteros-react-template';
import {
  AnterosRemoteDatasource,
  dataSourceConstants
} from 'anteros-react-datasource';

const PAGE_SIZE = 30;

@WithSearchModalTemplate({
  resource: Resources.ACAO,
  reducerName: 'acoesConsultaReducer',
  userReducerName: 'authenticationReducer',
  actions: actions,
  endPoints: EndPoints,
  openDataSourceFilter: true,
  openMainDataSource: true,
  pageSize: PAGE_SIZE,
  defaultSort: 'id',
  viewName: 'modalConsultaAcao',
  caption: 'Consulta ações',
  filterName: 'filtroAcao',
  messageLoading: 'Por favor aguarde...'
})
@boundClass
class ConsultaAcao extends Component {

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

  onFindAll(page, pageSize, sort, user, fieldsToForceLazy) {
    return EndPoints.FIND_ACTIONS_BY_SYSTEM(this.props.system.name, Resources.ACAO, page, pageSize, sort, user, fieldsToForceLazy)
  }

  onFindMultipleFields(filter, fields, page, pageSize, sort, user, fieldsToForceLazy) {
    return EndPoints.FIND_MULTIPLE_FIELDS_WITH_SYSTEM(this.props.system.name, Resources.ACAO, filter, fields, page, pageSize, sort, user, fieldsToForceLazy)
  }

  onFindWithFilter(filter, page, pageSize, sort, user, fieldsToForceLazy) {
    return EndPoints.FIND_WITH_FILTER_WITH_SYSTEM(this.props.system.name, this.props.system.id, Resources.ACAO, filter, page, pageSize, user, fieldsToForceLazy, sort)
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
    return <Fragment />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.authenticationReducer.user,
    authenticated: state.authenticationReducer.authenticated,
    system: state.sistemasAdminReducer.activeSystem
  }
};

export default connect(mapStateToProps, null)(ConsultaAcao);
