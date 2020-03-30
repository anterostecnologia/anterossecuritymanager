export const SET_DATASOURCE_PERFIS = 'SET_DATASOURCE_PERFIS';
export const SET_FILTER_PERFIS = 'SET_FILTER_PERFIS';

export const actions = {
  setDatasource(dataSource) {
    return { type: SET_DATASOURCE_PERFIS, payload: { dataSource } };
  },
  setFilter(activeFilter, query, sort, activeSortIndex, quickFilterText) {
    return {
      type: SET_FILTER_PERFIS,
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
    case SET_DATASOURCE_PERFIS: {
      return { ...state, dataSource: action.payload.dataSource };
    }
    case SET_FILTER_PERFIS: {
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
