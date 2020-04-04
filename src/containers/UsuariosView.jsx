import React, { Component } from 'react';
import { WithTableContainerTemplate } from 'anteros-react-template';
import { actions } from '../redux/modules/perfis';
import { Resources, EndPoints } from '../service/Resources';
import { QueryFields, QueryField } from 'anteros-react-querybuilder';
import { Columns, AnterosDataTableColumn } from 'anteros-react-table';
import { boundClass } from 'anteros-react-core';

@WithTableContainerTemplate({
    resource: Resources.USUARIO,
    reducerName: 'usuariosReducer',
    userReducerName: 'authenticationReducer',
    actions: actions,
    endPoints: EndPoints,
    openDataSourceFilter: true,
    openMainDataSource: true,
    pageSize: 20,
    quickFilterWidth: '50%',
    viewName: 'UsuariosView',
    caption: 'Usuários',
    filterName: 'filtroUsuarios',
    messageLoading: 'Por favor aguarde...',
    routes: {
        add: '/home/seguranca/usuario/adicionar',
        edit: '/home/seguranca/usuario/editar',
        close: '/home/default'
    }
})
@boundClass
class UsuariosView extends Component {

    onAfterInsert() {
        this.dataSource.setFieldByName('owner', this.props.user.owner.id);
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
        return null;
    }
}

export default UsuariosView;