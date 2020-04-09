const initialState = {
  isLoading: false,
  showAppBar: true,
  showSearchBar: false,
  appBarTitle: 'RENTGLOBAL Real Estate',
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

  default:
    return currentState;
  }
};

export default appReducer;
