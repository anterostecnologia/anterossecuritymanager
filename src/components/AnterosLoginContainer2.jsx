import React, { Component } from 'react';
import { AnterosLinearProgressBar } from 'anteros-react-misc';
import {
  AnterosFullBackground,
  AnterosForm,
  AnterosFormGroup
} from 'anteros-react-containers';
import { AnterosAlert } from 'anteros-react-notification';
import { AnterosImage } from 'anteros-react-image';
import {
  AnterosPassword,
  AnterosEdit,
  AnterosCheckbox
} from 'anteros-react-editors';
import { AnterosLabel } from 'anteros-react-label';
import { AnterosButton } from 'anteros-react-buttons';
import { connect } from 'react-redux';
import { actions } from '../redux/modules/authentication';
import PropTypes from 'prop-types';
import { boundClass } from 'anteros-react-core';


const imgHolder = {
  width: '550px',
  backgroundColor: '#fff',
  minHeight: '700px',
  miWidth: '540px',
  height: '100%',
  overflow: 'hidden',
  padding: '60px',
  textAlign: 'center',
  zIndex: '999'
};

const formHolder = {
  width: '100%',
  textAlign: 'center',
  WebkitTransition: 'all 0.4s ease',
  display: 'flex',
  justifyContent: 'center',
  alignIems: 'center',
  padding: '60px',
  minHeight: '100%'
};

const infoHolder = {
  position: 'relative',
  top: '50%',
  WebkitBoxShadow: 'translateY(-50%)',
  MozTransform: 'translateY(-50%)',
  msTransform: 'translateY(-50%)',
  transform: 'translateY(-50%)'
};

const form = {
  display: 'inline-block',
  width: '100%',
  maxWidth: '500px',
  textAlign: 'left',
  transition: 'all 0.4s ease',
  maxHeight: 'fit-content',
  WebkitBoxShadow: 'translateY(25%)',
  MozTransform: 'translateY(25%)',
  msTransform: 'translateY(25%)',
  transform: 'translateY(25%)'
};

const botaoEntrarStyle = {
  backgroundColor: '#1a249c',
  color: '#fff',
  marginRight: '10px',
  marginTop: '.5rem',
  maxWidth: '110px',
  WebkitBoxShadow: '0 0 0 rgba(0, 0, 0, 0.16)',
  boxShadow: '0 0 0 rgba(0, 0, 0, 0.16)'
};

const user = {
  owner: {
    cnpj: "76295344000137",
    descricao: "Tigrara nova",
    id: "7fd3e7af-e8cd-4de7-9806-230c8d6022c2",
    nrVersao: 2,
    urlAPI: "http://",
    cidade: {
      estado: {
        cidades: null,
        id: 18,
        nomeEstado:
          "Paraná",
        nrVersao: 1,
        pais: {
          estados: null,
          idPais: 1,
          nomePais: "Brasil",
          nrVersao: 1,
          siglaEstado: "PR"
        },
        id: 2860,
        idCidadeIBGE: 4105508,
        nomeCidade: "Cianorte",
        nrVersao: 1
      },
    },
  },
  profile: {
    actionList: [],
    actions: null,
    administrator: true,
    avatar: "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",
    blockedAccount: false,
    boAdministrator: true,
    boFreeAccessTime: true,
    description: "Edson Martins",
    email: "edson@anteros.com.br",
    groups: null,
    id: 1,
    inactiveAccount: false,
    name: "Edson Martins",
    securityAccess: null,
    type: "USUARIO"
  },
  token: {
    access_token: "c5843250-af89-4664-a6ff-32d63c02d72e",
    expires_in: 43199,
    refresh_token: "fdcbffe5-a07f-4e1c-a7e7-b1bbe25d5fcb",
    scope: "read write",
    token_type: "bearer",
  }
}


@boundClass
class AnterosLoginContainer2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userName: '',
      password: '',
      owner: undefined,
      remindMe: null,
      error: undefined
    };
    this.login = this.login.bind(this);
  }

  login() {
    let _this = this;
    _this.setState({ ..._this.state, error: undefined });
    this.props.dispatch(
      actions.login(
        {
          username: this.state.userName,
          password: this.state.password,
          owner: this.state.owner
        },
        (user, error) => {
          if (error) {
            _this.setState({ ..._this.state, error: error });
          } else {
            _this.props.onLoginSuccess(user);
          }
        }
      )
    );
    if (typeof Storage !== 'undefined') {
      if (this.state.remindMe) {
        localStorage.setItem('owner', this.state.owner);
        localStorage.setItem('remindMe', this.state.remindMe);
      } else {
        localStorage.removeItem('owner', this.state.owner);
        localStorage.removeItem('remindMe', this.state.remindMe);
      }
    }
  }

  onChangeOwner(event, value) {
    this.setState({
      ...this.state,
      owner: value
    });
  }

  onChangeUser(event, value) {
    this.setState({
      ...this.state,
      userName: value
    });
  }

  onChangePassword(event, value) {
    this.setState({
      ...this.state,
      password: event.target.value
    });
  }

  onChangeRemindMe(value, checked, checkbox) {
    this.setState({
      ...this.state,
      remindMe: checked
    });
  }

  componentWillMount() {
    if (this.state.remindMe === null) {
      if (localStorage.hasOwnProperty('remindMe')) {
        this.setState({
          ...this.state,
          remindMe: JSON.parse(localStorage.getItem('remindMe')),
          owner: localStorage.getItem('owner')
        });
      } else {
        this.setState({ ...this.state, remindMe: false });
      }
    }
  }

  render() {
    const { loading } = this.state;
    const { authenticating } = this.props;
    return (
      <AnterosFullBackground
        color="#4F9BD4"
        custom="#4F9BD4"
        style={{
          overflowY: 'hidden',
          display: 'flex'
        }}
      >
        {loading && <AnterosLinearProgressBar />}
        <div
          style={{
            ...imgHolder,
            height: '100%'
          }}
        >
          <div style={infoHolder}>
            <AnterosImage
              width="300px"
              src={require('../assets/img/AnterosTecnologia-blue.png')}
              margin="0 0 60px 0"
            />
            <h3>Administração de sistemas, recursos, ações e usuários.</h3>
            <p>
              Mantenha o total controle sobre o que os seus usuários acessam e veja
              o que andam fazendo.
            </p>
            <AnterosImage
              width="100%"
              maxWidth="378px"
              src={require('../assets/img/abertura3.png')}
              alt=""
            />
          </div>
        </div>
        <div style={formHolder}>
          <AnterosForm style={form}>
            <AnterosLabel
              caption="Informe suas credencias para acesso:"
              small={12}
              style={{
                fontSize: '22px',
                color: '#464D69'
              }}
            />
            <AnterosFormGroup row={false}>
              <AnterosLabel
                caption="Identificador proprietário"
                small={6}
                style={{
                  color: '#464D69'
                }}
              />
              <AnterosEdit
                small={12}
                id="empresa"
                onChange={this.onChangeOwner}
                value={this.state.owner}
                disabled={authenticating}
                icon="fal fa-building"
              />
            </AnterosFormGroup>
            <AnterosFormGroup row={false}>
              <AnterosLabel
                caption="Usuário"
                small={2}
                style={{
                  color: '#464D69'
                }}
              />
              <AnterosEdit
                small={12}
                id="userName"
                onChange={this.onChangeUser}
                value={this.state.userName}
                disabled={authenticating}
                icon="fal fa-user-circle"
              />
            </AnterosFormGroup>
            <AnterosFormGroup row={false}>
              <AnterosLabel
                caption="Senha"
                small={2}
                style={{
                  color: '#464D69'
                }}
              />
              <AnterosPassword
                small={12}
                id="password"
                onChange={this.onChangePassword}
                value={this.state.password}
                disabled={authenticating}
                required
              />
            </AnterosFormGroup>
            <AnterosFormGroup row={false}>
              <AnterosAlert
                danger
                fill
                isOpen={!this.state.error ? false : true}
                autoCloseInterval={25000}
                onClose={this.onCloseAlert}
              >
                {this.state.error}
              </AnterosAlert>
            </AnterosFormGroup>
            <AnterosFormGroup row={false}>
              <AnterosLabel
                caption=""
                small={2}
                style={{
                  color: '#464D69'
                }}
              />
              <AnterosCheckbox
                small={12}
                id="chLogin"
                style={{
                  color: '#464D69'
                }}
                value="Lembre-me."
                checked={this.state.remindMe}
                valueChecked={true}
                onCheckboxChange={this.onChangeRemindMe}
                disabled={authenticating}
                valueUnchecked={false}
              />
            </AnterosFormGroup>
            <AnterosFormGroup row={false}>
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  paddingLeft: '15px'
                }}
              >
                <AnterosButton
                  block
                  medium
                  style={botaoEntrarStyle}
                  disabled={authenticating}
                  caption={authenticating ? 'Aguarde...' : 'Entrar'}
                  onButtonClick={this.login}
                />
                <AnterosLabel
                  caption="Esqueceu sua senha?"
                  style={{
                    color: '#464D69'
                  }}
                />
              </div>
            </AnterosFormGroup>
            {/* <AnterosFormGroup row={false}>
              <div
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  paddingLeft: '15px'
                }}
              >
                <AnterosLabel
                  caption="Ou acesse com: "
                  style={{
                    color: '#6B798F'
                  }}
                />
                <AnterosButton
                  block
                  facebook
                  medium
                  style={botaoEntrarStyle}
                  disabled={authenticating}
                  caption="Facebook"
                />
                <AnterosButton
                  block
                  googlePlus
                  medium
                  style={botaoEntrarStyle}
                  disabled={authenticating}
                  caption="Google"
                />
                <AnterosButton
                  block
                  instagram
                  medium
                  style={botaoEntrarStyle}
                  disabled={authenticating}
                  caption="Instagram"
                />
              </div>
            </AnterosFormGroup> */}
          </AnterosForm>
        </div>
      </AnterosFullBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authenticationReducer.user,
    authenticating: state.authenticationReducer.authenticating,
    authenticated: state.authenticationReducer.authenticated
  };
};

export default connect(
  mapStateToProps,
  null
)(AnterosLoginContainer2);

AnterosLoginContainer2.propTypes = {
  onLoginSuccess: PropTypes.func
};

AnterosLoginContainer2.defaultProps = {
  onLoginSuccess: f => f
};
