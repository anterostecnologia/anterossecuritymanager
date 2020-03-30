import axios from 'axios';
import { asmBaseURL, asmControlBaseURL, authBaseURL } from '../../constantes';

const initialState = {
  authenticating: false,
  authenticated: false,
  error: null,
  user: null,
  config: {
    url_token: authBaseURL,
    token: '/oauth/token',
    url_user_with_owner: asmBaseURL + '/v1',
    url_user_without_owner: asmControlBaseURL + '/v1',
    url_owner: asmControlBaseURL + '/v1',
    getUser: '/user/getUserByLogin/',
    getOwner: '/proprietario/',
    client_id: null,
    client_secret: null
  }
};

const CONFIG = 'auth-module/CONFIG';
const ACTION_LOGIN_PENDING = 'auth-module/LOGIN_PENDING';
const ACTION_LOGIN_SUCCESS = 'auth-module/LOGIN_SUCCESS';
const ACTION_LOGIN_ERROR = 'auth-module/LOGIN_ERROR';
const ACTION_LOGOUT = 'auth-module/LOGOUT';
const ACTION_GET_USER_PENDING = 'auth-module/GET_USER_PENDING';
const ACTION_GET_USER_SUCCESS = 'auth-module/GET_USER_SUCCESS';
const ACTION_GET_USER_ERROR = 'auth-module/GET_USER_ERROR';
const ACTION_SELECT_COMPANY = 'auth-module/SELECT_COMPANY';
const ACTION_UNSELECT_COMPANY = 'auth-module/UNSELECT_COMPANY';
const CLEAR_AUTHENTICATION = 'CLEAR_AUTHENTICATION';

export const actions = {
  loginStart() {
    return {
      type: ACTION_LOGIN_PENDING
    };
  },
  loginSuccess(user) {
    return {
      type: ACTION_LOGIN_SUCCESS,
      payload: {
        user
      }
    };
  },
  loginError(error) {
    return {
      type: ACTION_LOGIN_ERROR,
      payload: {
        error
      }
    };
  },
  selectCompany(company) {
    return {
      type: ACTION_SELECT_COMPANY,
      payload: {
        company
      }
    };
  },
  unSelectCompany() {
    return {
      type: ACTION_UNSELECT_COMPANY,
      payload: {
      }
    };
  },
  clear() {
    return {
      type: CLEAR_AUTHENTICATION,
      payload: {}
    };
  },
  getUserStart() {
    return {
      type: ACTION_GET_USER_PENDING
    };
  },
  getUserSuccess(user) {
    return {
      type: ACTION_GET_USER_SUCCESS,
      payload: {
        user
      }
    };
  },
  getUserError(error) {
    return {
      type: ACTION_GET_USER_ERROR,
      payload: {
        error
      }
    };
  },
  login(credentials, callback) {
    return (dispatch, getState) => {
      const { config } = getState().authenticationReducer;

      dispatch(actions.loginStart());

      var basic = 'Basic bmV4dXMtYWZ2OnNlbmhhX3NlY3JldGE=';
      if (!credentials.owner) {
        basic = 'Basic bmV4dXMtY29udHJvbDpzZW5oYV9zZWNyZXRh';
      }

      // let ownerHeader = '';
      //   if (credentials.owner){
      //     ownerHeader = '@'+credentials.owner;
      //   }

      var settings = {
        async: true,
        crossDomain: true,
        url: `${config.url_token}${config.token}`,
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: basic
        },
        data: {
          username: credentials.username,
          password: credentials.password,
          grant_type: 'password'
        },
        error: function (jqXHR, textStatus, errorThrown) {
          if (jqXHR.responseJSON && jqXHR.responseJSON.error === 'invalid_grant') {
            callback({}, 'Usuário/senha incorretos.');
          } else {
            callback({}, 'Ocorreu um erro localizando servidor.');
          }
          dispatch(actions.loginError(jqXHR.responseText));
        },
        success: function (data, textStatus, jqXHR) {
          dispatch(actions.getUser(credentials, data, callback));
        }
      };

      return new Promise((resolve, reject) => {
        window.$.ajax(settings);
      });
    };
  },
  getUser(credentials, token, callback) {
    return (dispatch, getState) => {
      const { config } = getState().authenticationReducer;
      let url_user = config.url_user_with_owner;
      if (!credentials.owner) {
        url_user = config.url_user_without_owner;
      }
      return new Promise((resolve, reject) => {

        // let ownerHeader = '';
        // if (credentials.owner){
        //   ownerHeader = '@'+credentials.owner;
        // }
        return axios
          .get(`${url_user}${config.getUser}${credentials.username}`, {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
              'Access-Control-Max-Age': '3600',
              'X-Tenant-ID': `'${credentials.owner}'`,
              'Access-Control-Allow-Headers':
                'Accept, Accept-CH, Accept-Charset, Accept-Datetime, Accept-Encoding, Accept-Ext, Accept-Features, Accept-Language, Accept-Params, Accept-Ranges, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Expose-Headers, Access-Control-Max-Age, Access-Control-Request-Headers, Access-Control-Request-Method, Age, Allow, Alternates, Authentication-Info, Authorization, C-Ext, C-Man, C-Opt, C-PEP, C-PEP-Info, CONNECT, Cache-Control, Compliance, Connection, Content-Base, Content-Disposition, Content-Encoding, Content-ID, Content-Language, Content-Length, Content-Location, Content-MD5, Content-Range, Content-Script-Type, Content-Security-Policy, Content-Style-Type, Content-Transfer-Encoding, Content-Type, Content-Version, Cookie, Cost, DAV, DELETE, DNT, DPR, Date, Default-Style, Delta-Base, Depth, Derived-From, Destination, Differential-ID, Digest, ETag, Expect, Expires, Ext, From, GET, GetProfile, HEAD, HTTP-date, Host, IM, If, If-Match, If-Modified-Since, If-None-Match, If-Range, If-Unmodified-Since, Keep-Alive, Label, Last-Event-ID, Last-Modified, Link, Location, Lock-Token, MIME-Version, Man, Max-Forwards, Media-Range, Message-ID, Meter, Negotiate, Non-Compliance, OPTION, OPTIONS, OWS, Opt, Optional, Ordering-Type, Origin, Overwrite, P3P, PEP, PICS-Label, POST, PUT, Pep-Info, Permanent, Position, Pragma, ProfileObject, Protocol, Protocol-Query, Protocol-Request, Proxy-Authenticate, Proxy-Authentication-Info, Proxy-Authorization, Proxy-Features, Proxy-Instruction, Public, RWS, Range, Referer, Refresh, Resolution-Hint, Resolver-Location, Retry-After, Safe, Sec-Websocket-Extensions, Sec-Websocket-Key, Sec-Websocket-Origin, Sec-Websocket-Protocol, Sec-Websocket-Version, Security-Scheme, Server, Set-Cookie, Set-Cookie2, SetProfile, SoapAction, Status, Status-URI, Strict-Transport-Security, SubOK, Subst, Surrogate-Capability, Surrogate-Control, TCN, TE, TRACE, Timeout, Title, Trailer, Transfer-Encoding, UA-Color, UA-Media, UA-Pixels, UA-Resolution, UA-Windowpixels, URI, Upgrade, User-Agent, Variant-Vary, Vary, Version, Via, Viewport-Width, WWW-Authenticate, Want-Digest, Warning, Width, X-Content-Duration, X-Content-Security-Policy, X-Content-Type-Options, X-CustomHeader, X-DNSPrefetch-Control, X-Forwarded-For, X-Forwarded-Port, X-Forwarded-Proto, X-Frame-Options, X-Modified, X-OTHER, X-PING, X-PINGOTHER, X-Powered-By, X-Requested-With'
            }
          })
          .then(response => {
            if (response.data === '' || response.data === undefined) {
              callback({}, 'Usuário/senha não encontrados!');
              dispatch(actions.loginError('Usuário/senha não encontrados!'));
            } else {
              if (!credentials.owner) {
                dispatch(
                  actions.loginSuccess({
                    token: token,
                    owner: undefined,
                    profile: response.data
                  })
                );
                axios.defaults.headers = {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token.access_token}`
                };
                callback({
                  token: token,
                  profile: response.data,
                  owner: undefined
                });
              } else {
                dispatch(
                  actions.getOwner(credentials, token, response.data, callback)
                );
              }
            }
          })
          .catch(error => {
            callback({}, 'Usuário/senha não encontrados!');
            dispatch(actions.loginError(error));
          });
      });
    };
  },
  getOwner(credentials, token, profile, callback) {
    return (dispatch, getState) => {
      const { config } = getState().authenticationReducer;
      return new Promise((resolve, reject) => {
        return axios
          .get(`${config.url_owner}${config.getOwner}${credentials.owner}?fieldsToForceLazy=`, {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
              'Access-Control-Max-Age': '3600',
              'Access-Control-Allow-Headers':
                'Accept, Accept-CH, Accept-Charset, Accept-Datetime, Accept-Encoding, Accept-Ext, Accept-Features, Accept-Language, Accept-Params, Accept-Ranges, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Expose-Headers, Access-Control-Max-Age, Access-Control-Request-Headers, Access-Control-Request-Method, Age, Allow, Alternates, Authentication-Info, Authorization, C-Ext, C-Man, C-Opt, C-PEP, C-PEP-Info, CONNECT, Cache-Control, Compliance, Connection, Content-Base, Content-Disposition, Content-Encoding, Content-ID, Content-Language, Content-Length, Content-Location, Content-MD5, Content-Range, Content-Script-Type, Content-Security-Policy, Content-Style-Type, Content-Transfer-Encoding, Content-Type, Content-Version, Cookie, Cost, DAV, DELETE, DNT, DPR, Date, Default-Style, Delta-Base, Depth, Derived-From, Destination, Differential-ID, Digest, ETag, Expect, Expires, Ext, From, GET, GetProfile, HEAD, HTTP-date, Host, IM, If, If-Match, If-Modified-Since, If-None-Match, If-Range, If-Unmodified-Since, Keep-Alive, Label, Last-Event-ID, Last-Modified, Link, Location, Lock-Token, MIME-Version, Man, Max-Forwards, Media-Range, Message-ID, Meter, Negotiate, Non-Compliance, OPTION, OPTIONS, OWS, Opt, Optional, Ordering-Type, Origin, Overwrite, P3P, PEP, PICS-Label, POST, PUT, Pep-Info, Permanent, Position, Pragma, ProfileObject, Protocol, Protocol-Query, Protocol-Request, Proxy-Authenticate, Proxy-Authentication-Info, Proxy-Authorization, Proxy-Features, Proxy-Instruction, Public, RWS, Range, Referer, Refresh, Resolution-Hint, Resolver-Location, Retry-After, Safe, Sec-Websocket-Extensions, Sec-Websocket-Key, Sec-Websocket-Origin, Sec-Websocket-Protocol, Sec-Websocket-Version, Security-Scheme, Server, Set-Cookie, Set-Cookie2, SetProfile, SoapAction, Status, Status-URI, Strict-Transport-Security, SubOK, Subst, Surrogate-Capability, Surrogate-Control, TCN, TE, TRACE, Timeout, Title, Trailer, Transfer-Encoding, UA-Color, UA-Media, UA-Pixels, UA-Resolution, UA-Windowpixels, URI, Upgrade, User-Agent, Variant-Vary, Vary, Version, Via, Viewport-Width, WWW-Authenticate, Want-Digest, Warning, Width, X-Content-Duration, X-Content-Security-Policy, X-Content-Type-Options, X-CustomHeader, X-DNSPrefetch-Control, X-Forwarded-For, X-Forwarded-Port, X-Forwarded-Proto, X-Frame-Options, X-Modified, X-OTHER, X-PING, X-PINGOTHER, X-Powered-By, X-Requested-With'
            }
          })
          .then(response => {
            if (response.data === '' || response.data === undefined) {
              callback({}, 'Proprietário do sistema não encontrado!');
              dispatch(
                actions.loginError('Proprietário do sistema não encontrado!')
              );
            } else {
              dispatch(
                actions.loginSuccess({
                  token: token,
                  owner: response.data,
                  profile: profile
                })
              );
              axios.defaults.headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.access_token}`
              };
              callback({
                token: token,
                profile: profile,
                owner: response.data
              });
            }
          })
          .catch(error => {
            callback({}, 'Proprietário do sistema não encontrado!');
            dispatch(actions.loginError(error));
          });
      });
    };
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONFIG:
      return { ...state, config: action.payload };
    case ACTION_LOGIN_PENDING: {
      return {
        ...state,
        authenticating: true,
        authenticated: false,
        user: null,
        error: null
      };
    }
    case ACTION_LOGIN_ERROR: {
      return {
        ...state,
        authenticating: false,
        authenticated: false,
        user: null,
        error: action.payload.error
      };
    }
    case ACTION_LOGIN_SUCCESS: {
      return {
        ...state,
        authenticating: false,
        authenticated: true,
        error: null,
        user: action.payload.user
      };
    }
    case ACTION_LOGOUT: {
      return {
        ...state,
        authenticating: false,
        authenticated: false,
        error: null,
        user: {
          token: null,
          profile: null
        }
      };
    }
    case ACTION_SELECT_COMPANY: {
      return {
        ...state,
        user: {
          ...state.user,
          company: action.payload.company
        }
      };
    }
    case ACTION_UNSELECT_COMPANY: {
      return {
        ...state,
        user: {
          ...state.user,
          company: undefined
        }
      };
    } case CLEAR_AUTHENTICATION: {
      return { ...state }
    }
    default:
      return {
        ...state
      };
  }
};
