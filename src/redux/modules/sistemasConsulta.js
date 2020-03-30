export const SET_DATASOURCE_SISTEMAS_CONSULTA =
  'SET_DATASOURCE_SISTEMAS_CONSULTA';
export const SET_FILTER_SISTEMAS_CONSULTA = 'SET_FILTER_SISTEMAS_CONSULTA';

export const actions = {
  setDatasource(dataSource) {
    return { type: SET_DATASOURCE_SISTEMAS_CONSULTA, payload: { dataSource } };
  },
  setFilter(activeFilter, query, sort, activeSortIndex, quickFilterText) {
    return {
      type: SET_FILTER_SISTEMAS_CONSULTA,
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
    case SET_DATASOURCE_SISTEMAS_CONSULTA: {
      return { ...state, dataSource: action.payload.dataSource };
    }
    case SET_FILTER_SISTEMAS_CONSULTA: {
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
