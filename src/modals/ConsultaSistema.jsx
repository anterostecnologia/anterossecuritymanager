import React, { Component, Fragment } from 'react';
import { AnterosDataTableColumn, Columns } from 'anteros-react-table';
import { QueryFields, QueryField } from 'anteros-react-querybuilder';
import { actions } from '../redux/modules/sistemasConsulta';
import { boundClass } from 'anteros-react-core';
import { Resources, EndPoints } from '../service/Resources';
import { WithSearchModalTemplate } from 'anteros-react-template';

@WithSearchModalTemplate({
  resource: Resources.SISTEMA,
  reducerName: 'sistemasConsultaReducer',
  userReducerName: 'authenticationReducer',
  actions: actions,
  endPoints: EndPoints,
  openDataSourceFilter: true,
  openMainDataSource: true,
  pageSize: 30,
  defaultSort: 'id',
  viewName: 'modalConsultaSistema',
  caption: 'Consulta sistema',
  filterName: 'filtroSistema',
  messageLoading: 'Por favor aguarde...'
})
@boundClass
class ConsultaSistema extends Component {

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
          label="Nome usuario"
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
          name="email"
          label="E-mail"
          quickFilter={true}
          quickFilterSort={false}
          sortable={true}
        />
        <QueryField
          name="login"
          label="Login"
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
          dataField="avatar"
          title="Avatar"
          width="10%"
          titleAlign="center"
          align="center"
          imageCircle
          imageWidth="40px"
          imageHeight="40px"
          placeHolder={require('../assets/img/user.png')}
          dataType="image"
        />
        <AnterosDataTableColumn
          dataField="login"
          title="Login"
          width="10%"
        />
        <AnterosDataTableColumn
          dataField="name"
          title="Nome do usuário"
          width="20%"
        />
        <AnterosDataTableColumn
          dataField="description"
          title="Descrição"
          width="20%"
        />
        <AnterosDataTableColumn
          dataField="email"
          title="E-mail"
          width="20%"
        />
        <AnterosDataTableColumn
          dataField="boAdministrator"
          title="Administrador?"
          width="10%"
        />
      </Columns>
    );
  }

  render() {
    return <Fragment />;
  }
}

export default ConsultaSistema;
