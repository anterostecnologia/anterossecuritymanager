import React, { Component, Fragment } from 'react';
import { AnterosDataTableColumn, Columns } from 'anteros-react-table';
import { QueryFields, QueryField } from 'anteros-react-querybuilder';
import { actions } from '../redux/modules/logAcessoConsulta';
import { boundClass } from 'anteros-react-core';
import { Resources, EndPoints } from '../service/Resources';
import { WithSearchModalTemplate } from 'anteros-react-template';

@WithSearchModalTemplate({
  resource: Resources.LOG,
  reducerName: 'logAcessoConsultaReducer',
  userReducerName: 'authenticationReducer',
  actions: actions,
  endPoints: EndPoints,
  openDataSourceFilter: true,
  openMainDataSource: true,
  pageSize: 30,
  defaultSort: 'id',
  viewName: 'modalConsultaLogAcesso',
  caption: 'Consulta log de acesso',
  filterName: 'filtroLogAcesso',
  messageLoading: 'Por favor aguarde...'
})
@boundClass
class ConsultaLogAcesso extends Component {

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

export default ConsultaLogAcesso;
