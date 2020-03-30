import React, { Component, Fragment } from 'react';
import { AnterosDataTableColumn, Columns } from 'anteros-react-table';
import { QueryFields, QueryField } from 'anteros-react-querybuilder';
import { actions } from '../redux/modules/usuariosConsulta';
import { boundClass } from 'anteros-react-core';
import { Resources, EndPoints } from '../service/Resources';
import { WithSearchModalTemplate } from 'anteros-react-template';

@WithSearchModalTemplate({
  resource: Resources.USUARIO,
  reducerName: 'usuariosConsultaReducer',
  userReducerName: 'authenticationReducer',
  actions: actions,
  endPoints: EndPoints,
  openDataSourceFilter: true,
  openMainDataSource: true,
  pageSize: 30,
  defaultSort: 'id',
  viewName: 'modalConsultaUsuario',
  caption: 'Consulta usuário',
  filterName: 'filtroUsuario',
  messageLoading: 'Por favor aguarde...'
})
@boundClass
class ConsultaUsuario extends Component {

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
    return <Fragment />;
  }
}

export default ConsultaUsuario;