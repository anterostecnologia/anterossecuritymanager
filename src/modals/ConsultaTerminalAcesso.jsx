import React, { Component, Fragment } from 'react';
import { AnterosDataTableColumn, Columns } from 'anteros-react-table';
import { QueryFields, QueryField } from 'anteros-react-querybuilder';
import { actions } from '../redux/modules/terminaisAcessoConsulta';
import { boundClass } from 'anteros-react-core';
import { Resources, EndPoints } from '../service/Resources';
import { WithSearchModalTemplate } from 'anteros-react-template';

@WithSearchModalTemplate({
  resource: Resources.TERMINALACESSO,
  reducerName: 'terminaisAcessoConsultaReducer',
  userReducerName: 'authenticationReducer',
  actions: actions,
  endPoints: EndPoints,
  openDataSourceFilter: true,
  openMainDataSource: true,
  pageSize: 30,
  defaultSort: 'id',
  viewName: 'modalConsultaTerminalAcesso',
  caption: 'Consulta terminal de acesso',
  filterName: 'filtroTerminalAcesso',
  messageLoading: 'Por favor aguarde...'
})
@boundClass
class ConsultaTerminalAcesso extends Component {

  getFieldsFilter() {
    return (
      <QueryFields>

      </QueryFields>
    );
  }

  getColumns() {
    return (
      <Columns>

      </Columns>
    );
  }

  render() {
    return <Fragment />;
  }
}

export default ConsultaTerminalAcesso;