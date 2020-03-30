import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

import authenticationReducer from '../redux/modules/authentication';
import acoesReducer from '../redux/modules/acoes';
import acoesConsultaReducer from '../redux/modules/acoesConsulta';
import sistemasReducer from '../redux/modules/sistemas';
import sistemasConsultaReducer from '../redux/modules/sistemasConsulta';
import recursosReducer from '../redux/modules/recursos';
import recursosConsultaReducer from '../redux/modules/recursosConsulta';
import gruposReducer from '../redux/modules/grupos';
import gruposConsultaReducer from '../redux/modules/gruposConsulta';
import usuariosReducer from '../redux/modules/usuarios';
import usuariosConsultaReducer from '../redux/modules/usuariosConsulta';
import perfisReducer from '../redux/modules/perfis';
import perfisConsultaReducer from '../redux/modules/perfisConsulta';
import terminaisAcessoReducer from '../redux/modules/terminaisAcesso';
import terminaisAcessoConsultaReducer from '../redux/modules/terminaisAcessoConsulta';
import horariosAcessoReducer from '../redux/modules/horariosAcesso';
import horariosAcessoConsultaReducer from '../redux/modules/horariosAcessoConsulta';
import adminLayoutReducer from '../components/AnterosAdminReducer';
import sistemasAdminReducer from '../redux/modules/sistemasAdmin';

const reducers = combineReducers({
  authenticationReducer,
  acoesReducer,
  acoesConsultaReducer,
  sistemasReducer,
  sistemasConsultaReducer,
  recursosReducer,
  recursosConsultaReducer,
  gruposReducer,
  gruposConsultaReducer,
  usuariosReducer,
  usuariosConsultaReducer,
  perfisReducer,
  perfisConsultaReducer,
  terminaisAcessoReducer,
  terminaisAcessoConsultaReducer,
  horariosAcessoReducer,
  horariosAcessoConsultaReducer,
  adminLayoutReducer,
  sistemasAdminReducer
});

export function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(createLogger(), thunk, promise()))
  );
  return store;
}
