import React, { Component, Fragment } from 'react';
import { AnterosDataTableColumn, Columns } from 'anteros-react-table';
import { QueryFields, QueryField } from 'anteros-react-querybuilder';
import { actions } from '../redux/modules/perfisConsulta';
import { boundClass } from 'anteros-react-core';
import { Resources, EndPoints } from '../service/Resources';
import { WithSearchModalTemplate } from 'anteros-react-template';

@WithSearchModalTemplate({
  resource: Resources.PERFIL,
  reducerName: 'perfisConsultaReducer',
  userReducerName: 'authenticationReducer',
  actions: actions,
  endPoints: EndPoints,
  openDataSourceFilter: true,
  openMainDataSource: true,
  pageSize: 30,
  defaultSort: 'id',
  viewName: 'modalConsultaPerfil',
  caption: 'Consulta perfil',
  filterName: 'filtroPerfil',
  messageLoading: 'Por favor aguarde...'
})
@boundClass
class ConsultaPerfil extends Component {

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
    return <Fragment />;
  }
}

export default ConsultaPerfil;
