import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const HomeView = React.lazy(() => import('./containers/HomeView'));
const SistemasView = React.lazy(() => import('./containers/SistemasView'));
const RecursosView = React.lazy(() => import('./containers/RecursosView'));
const FormsView = React.lazy(() => import('./containers/FormsView'));
const AcoesView = React.lazy(() => import('./containers/AcoesView'));
const TerminalAcessoView = React.lazy(() => import('./containers/TerminalAcessoView'));
const UsuariosView = React.lazy(() => import('./containers/UsuariosView'));
const PerfisView = React.lazy(() => import('./containers/PerfisView'));
const GruposView = React.lazy(() => import('./containers/GruposView'));
const SistemasForm = React.lazy(() => import('./forms/SistemasForm'));
const RecursosForm = React.lazy(() => import('./forms/RecursosForm'));
const AcoesForm = React.lazy(() => import('./forms/AcoesForm'));


const routes = [
    { path: '/home/default', exact: true, name: 'Home', component: HomeView, isSecurity: true },
    { path: '/home/recurso/sistema/consulta', exact: true, name: 'Sistemas', component: SistemasView, isSecurity: true},
    { path: '/home/recurso/sistema/adicionar', exact: true, name: 'Sistemas', component: SistemasForm, isSecurity: true },
    { path: '/home/recurso/sistema/editar', exact: true, name: 'Sistemas', component: SistemasForm, isSecurity: true },
    { path: '/home/recurso/servico/consulta', exact: true, name: 'Serviços', component: RecursosView, isSecurity: true },
    { path: '/home/recurso/servico/adicionar', exact: true, name: 'Serviços', component: RecursosForm, isSecurity: true },
    { path: '/home/recurso/servico/editar', exact: true, name: 'Serviços', component: RecursosForm, isSecurity: true },
    { path: '/home/recurso/form/consulta', exact: true, name: 'Formulários', component: FormsView, isSecurity: true },
    { path: '/home/recurso/acao/consulta', exact: true, name: 'Ações', component: AcoesView, isSecurity: true },
    { path: '/home/recurso/acao/adicionar', exact: true, name: 'Ações', component: AcoesForm, isSecurity: true },
    { path: '/home/recurso/acao/editar', exact: true, name: 'Ações', component: AcoesForm, isSecurity: true },
    { path: '/home/recurso/terminalacesso/consulta', exact: true, name: 'Terminais de acesso', component: TerminalAcessoView, isSecurity: true },
    { path: '/home/seguranca/perfil/consulta', exact: true, name: 'Perfis', component: PerfisView, isSecurity: true },
    { path: '/home/seguranca/usuario/consulta', exact: true, name: 'Usuários', component: UsuariosView, isSecurity: true },
    { path: '/home/seguranca/grupo/consulta', exact: true, name: 'Usuários', component: GruposView, isSecurity: true },
];

export default routes;