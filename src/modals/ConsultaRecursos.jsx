import React, { Component, Fragment } from 'react';
import { AnterosDataTableColumn, Columns } from 'anteros-react-table';
import { QueryFields, QueryField } from 'anteros-react-querybuilder';
import { actions } from '../redux/modules/perfisConsulta';
import { boundClass } from 'anteros-react-core';
import { Resources, EndPoints } from '../service/Resources';
import { WithSearchModalTemplate } from 'anteros-react-template';
import { connect } from 'react-redux';

@WithSearchModalTemplate({
  resource: Resources.RECURSO,
  reducerName: 'recursosConsultaReducer',
  userReducerName: 'authenticationReducer',
  actions: actions,
  endPoints: EndPoints,
  openDataSourceFilter: true,
  openMainDataSource: true,
  pageSize: 30,
  defaultSort: 'id',
  viewName: 'modalConsultaRecurso',
  caption: 'Consulta recursos',
  filterName: 'filtroRecurso',
  messageLoading: 'Por favor aguarde...'
})
@boundClass
class ConsultaRecurso extends Component {

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
export default connect(mapStateToProps, null)(ConsultaRecurso);
