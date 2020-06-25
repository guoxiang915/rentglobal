import VisitRequest from "../utils/visitRequest";

const visitRequestObj = new VisitRequest();

const initialState = {
  isLoading: false,
  showAppBar: true,
  showSearchBar: false,
  showBottomShortList: true,
  shortList: JSON.parse(visitRequestObj.getCompanyVisitRequests()) || [],
  appBarTitle: 'RENTGLOBAL Real Estate',
  language: typeof localStorage !== 'undefined' ? (localStorage.getItem('i18nextLng') || 'en') : 'en',
};

const appReducer = (currentState = initialState, action) => {
  switch (action.type) {
  case 'SHOW_APPBAR':
    return {
      ...currentState,
      isLoading: false,
      showAppBar: action.visible ? action.visible : true,
      showSearchBar: false,
    };

  case 'SHOW_SEARCHBAR':
    return {
      ...currentState,
      isLoading: false,
      showSearchBar: action.visible ? action.visible : true,
      showAppBar: false,
    };

  case 'UPDATE_APP_TITLE':
    return {
      ...currentState,
      appBarTitle: action.title,
    };

  case 'SHOW_BOTTOM_SHORT_LIST':
    return {
      ...currentState,
      showBottomShortList: action.visible,
    };

  case 'SET_OFFICE_SHORT_LIST':
    visitRequestObj.setCompanyVisitRequests([...action.shortList]);
    return {
      ...currentState,
      shortList: [...action.shortList],
    };

  case 'CHANGE_LANGUAGE':
    return {
      ...currentState,
      language: action.language,
    };

  default:
    return currentState;
  }
};

export default appReducer;
