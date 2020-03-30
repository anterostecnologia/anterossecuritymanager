export const SET_DATASOURCE_USUARIOS = 'SET_DATASOURCE_USUARIOS';
export const SET_FILTER_USUARIOS = 'SET_FILTER_USUARIOS';

export const actions = {
  setDatasource(dataSource) {
    return { type: SET_DATASOURCE_USUARIOS, payload: { dataSource } };
  },
  setFilter(activeFilter, query, sort, activeSortIndex, quickFilterText) {
    return {
      type: SET_FILTER_USUARIOS,
      payload: { activeFilter, query, sort, activeSortIndex, quickFilterText }
    };
  }
};

export default (
  state = {
    activeFilter: undefined,
    dataSource: undefined,
    query: {},
    sort: [],
    activeSortIndex: 0,
    quickFilterText: ''
  },
  action
) => {
  switch (action.type) {
    case SET_DATASOURCE_USUARIOS: {
      return { ...state, dataSource: action.payload.dataSource };
    }
    case SET_FILTER_USUARIOS: {
      return {
        ...state,
        activeFilter: action.payload.activeFilter,
        query: action.payload.query,
        sort: action.payload.sort,
        activeSortIndex: action.payload.activeSortIndex,
        quickFilterText: action.payload.quickFilterText
      };
    }
    default: {
      return state;
    }
  }
};
