export const SET_DATASOURCE_SISTEMAS_ADMIN =
  'SET_DATASOURCE_SISTEMAS_ADMIN';

export const actions = {
  setDatasource(dataSource, system) {
    return { type: SET_DATASOURCE_SISTEMAS_ADMIN, payload: { dataSource, system } };
  }
};

export default (
  state = {
    activeSystem: undefined,
    dataSource: undefined,
  },
  action
) => {
  switch (action.type) {
    case SET_DATASOURCE_SISTEMAS_ADMIN: {
      return { ...state, dataSource: action.payload.dataSource, activeSystem: action.payload.system };
    }
    default: {
      return state;
    }
  }
};
