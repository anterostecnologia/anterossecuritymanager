import React, { Component, Fragment } from 'react';
import { AnterosDataTableColumn, Columns } from 'anteros-react-table';
import { QueryFields, QueryField } from 'anteros-react-querybuilder';
import { actions } from '../redux/modules/horariosAcessoConsulta';
import { boundClass } from 'anteros-react-core';
import { Resources, EndPoints } from '../service/Resources';
import { WithSearchModalTemplate } from 'anteros-react-template';

@WithSearchModalTemplate({
  resource: Resources.HORARIO,
  reducerName: 'horariosAcessoConsultaReducer',
  userReducerName: 'authenticationReducer',
  actions: actions,
  endPoints: EndPoints,
  openDataSourceFilter: true,
  openMainDataSource: true,
  pageSize: 30,
  defaultSort: 'id',
  viewName: 'modalConsultaHorarioAcesso',
  caption: 'Consulta horário de acesso',
  filterName: 'filtroHorarioAcesso',
  messageLoading: 'Por favor aguarde...'
})
@boundClass
class ConsultaHorarioAcesso extends Component {

  getFieldsFilter() {
    return (
      <QueryFields>
        /
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

export default ConsultaHorarioAcesso;
