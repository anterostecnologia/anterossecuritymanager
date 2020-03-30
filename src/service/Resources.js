import {
  AnterosJacksonParser,
  AnterosDateUtils
} from 'anteros-react-core';

const POST = 'post';
const DELETE = 'delete';
const GET = 'get';

export const Resources = {
  SISTEMA: 'v1/system/',
  RECURSO: 'v1/resource/',
  ACAO: 'v1/action/',
  GRUPO: 'v1/group/',
  USUARIO: 'v1/user/',
  PERFIL: 'v1/profile/',
  TERMINALACESSO: 'v1/terminal/',
  HORARIO: 'v1/accessTime/',
  LOG: 'v1/log/',
  AUDITORIA: 'v1/auditoria/'
};

export const EndPoints = {
  POST: function (resourceName, entity, user) {
    let entityJson = AnterosJacksonParser.convertObjectToJson(entity);
    let result = {
      url: resourceName,
      method: POST,
      data: entityJson
    };
    if (user.owner) {
      result = {
        ...result,
        headers: {
          "X-Tenant-ID": user.owner.id
        }
      }
    }
    if (user.company) {
      result = {
        ...result,
        headers: {
          ...result.headers,
          "X-Company-ID": user.company.id
        }
      }
    }
    return result;
  },
  VALIDATE: function (resourceName, entity, user) {
    let entityJson = AnterosJacksonParser.convertObjectToJson(entity);
    let result = {
      url: `${resourceName}validate`,
      method: POST,
      data: entityJson
    };
    if (user.owner) {
      result = {
        ...result,
        headers: {
          "X-Tenant-ID": user.owner.id
        }
      }
    }
    if (user.company) {
      result = {
        ...result,
        headers: {
          ...result.headers,
          "X-Company-ID": user.company.id
        }
      }
    }
    return result;
  },
  DELETE: function (resourceName, entity, user) {
    let result = {};
    if (resourceName === Resources.EQUIPAMENTO) {
      result = {
        url: `${resourceName}${entity.uuid}`,
        method: DELETE
      };
    } else {
      result = {
        url: `${resourceName}${entity.id}`,
        method: DELETE
      };
    }
    if (user.owner) {
      result = {
        ...result,
        headers: {
          "X-Tenant-ID": user.owner.id
        }
      }
    }
    if (user.company) {
      result = {
        ...result,
        headers: {
          ...result.headers,
          "X-Company-ID": user.company.id
        }
      }
    }
    return result;
  },
  FIND_ONE: function (resourceName, value, user, fieldsToForceLazy = "") {
    let result = {
      url: `${resourceName}${value}?fieldsToForceLazy=${fieldsToForceLazy}`,
      method: GET
    };
    if (user.owner) {
      result = {
        ...result,
        headers: {
          "X-Tenant-ID": user.owner.id
        }
      }
    }
    if (user.company) {
      result = {
        ...result,
        headers: {
          ...result.headers,
          "X-Company-ID": user.company.id
        }
      }
    }
    return result;
  },
  FIND_ALL: function (resourceName, page, size, sort, user, fieldsToForceLazy = "") {
    if (sort) {
      let result = {
        url: `${resourceName}findAll?page=${page}&size=${size}&sort=${sort}&fieldsToForceLazy=${fieldsToForceLazy}`,
        method: GET
      };
      if (user.owner) {
        result = {
          ...result,
          headers: {
            "X-Tenant-ID": user.owner.id
          }
        }
      }
      if (user.company) {
        result = {
          ...result,
          headers: {
            ...result.headers,
            "X-Company-ID": user.company.id
          }
        }
      }
      return result;
    }
    let result1 = {
      url: `${resourceName}findAll?page=${page}&size=${size}&fieldsToForceLazy=${fieldsToForceLazy}`,
      method: GET
    };
    if (user.owner) {
      result1 = {
        ...result1,
        headers: {
          "X-Tenant-ID": user.owner.id
        }
      }
    }
    if (user.company) {
      result1 = {
        ...result1,
        headers: {
          ...result1.headers,
          "X-Company-ID": user.company.id
        }
      }
    }
    return result1;
  },
  FIND_WITH_FILTER: function (resourceName, data, page, size, user, fieldsToForceLazy = "", sort = "") {
    let result = {
      url: `${resourceName}findWithFilter?page=${page}&size=${size}&fieldsToForceLazy=${fieldsToForceLazy}`,
      data: data,
      method: POST
    };
    if (user.owner) {
      result = {
        ...result,
        headers: {
          "X-Tenant-ID": user.owner.id
        }
      }
    }
    if (user.company) {
      result = {
        ...result,
        headers: {
          ...result.headers,
          "X-Company-ID": user.company.id
        }
      }
    }
    return result;
  },
  FIND_MULTIPLE_FIELDS: function (
    resourceName,
    filter,
    fields,
    page,
    size,
    sort,
    user,
    fieldsToForceLazy = ""
  ) {
    let result = {
      url: `${resourceName}findMultipleFields?filter=${encodeURIComponent(filter)}&fields=${fields}&page=${page}&size=${size}&sort=${sort}&fieldsToForceLazy=${fieldsToForceLazy}`,
      method: POST
    };
    if (user.owner) {
      result = {
        ...result,
        headers: {
          "X-Tenant-ID": user.owner.id
        }
      }
    }
    if (user.company) {
      result = {
        ...result,
        headers: {
          ...result.headers,
          "X-Company-ID": user.company.id
        }
      }
    }
    return result;
  },
  FIND_RESOURCES_BY_SYSTEM: function (system, resourceName, page, size, sort, user, fieldsToForceLazy = "") {
    let result = {
      url: `${resourceName}getResourcesBySystem/${system}?page=${page}&size=${size}&sort=${sort}&fieldsToForceLazy=${fieldsToForceLazy}`,
      method: GET
    };
    if (user.owner) {
      result = {
        ...result,
        headers: {
          "X-Tenant-ID": user.owner.id
        }
      }
    }
    if (user.company) {
      result = {
        ...result,
        headers: {
          ...result.headers,
          "X-Company-ID": user.company.id
        }
      }
    }
    return result;
  },
  FIND_ACTIONS_BY_SYSTEM: function (system, resourceName, page, size, sort, user, fieldsToForceLazy = "") {
    let result = {
      url: `${resourceName}getActionsBySystem/${system}?page=${page}&size=${size}&sort=${sort}&fieldsToForceLazy=${fieldsToForceLazy}`,
      method: GET
    };
    if (user.owner) {
      result = {
        ...result,
        headers: {
          "X-Tenant-ID": user.owner.id
        }
      }
    }
    if (user.company) {
      result = {
        ...result,
        headers: {
          ...result.headers,
          "X-Company-ID": user.company.id
        }
      }
    }
    return result;
  },
  FIND_MULTIPLE_FIELDS_WITH_SYSTEM: function (
    system,
    resourceName,
    filter,
    fields,
    page,
    size,
    sort,
    user,
    fieldsToForceLazy = ""
  ) {
    let result = {
      url: `${resourceName}findMultipleFields/${system}?filter=${encodeURIComponent(filter)}&fields=${fields}&page=${page}&size=${size}&sort=${sort}&fieldsToForceLazy=${fieldsToForceLazy}`,
      method: POST
    };
    if (user.owner) {
      result = {
        ...result,
        headers: {
          "X-Tenant-ID": user.owner.id
        }
      }
    }
    if (user.company) {
      result = {
        ...result,
        headers: {
          ...result.headers,
          "X-Company-ID": user.company.id
        }
      }
    }
    return result;
  },
  FIND_WITH_FILTER_WITH_SYSTEM: function (system,resourceName, data, page, size, user, fieldsToForceLazy = "", sort = "") {
    let result = {
      url: `${resourceName}findWithFilter/${system}?page=${page}&size=${size}&fieldsToForceLazy=${fieldsToForceLazy}`,
      data: data,
      method: POST
    };
    if (user.owner) {
      result = {
        ...result,
        headers: {
          "X-Tenant-ID": user.owner.id
        }
      }
    }
    if (user.company) {
      result = {
        ...result,
        headers: {
          ...result.headers,
          "X-Company-ID": user.company.id
        }
      }
    }
    return result;
  },
};