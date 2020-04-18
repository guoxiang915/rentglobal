const initialState = {
  isLoading: false,
  showAppBar: true,
  showSearchBar: false,
  appBarTitle: 'RENTGLOBAL Real Estate',
  language: localStorage.getItem("i18nextLng") || 'en'
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
