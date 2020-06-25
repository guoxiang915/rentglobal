export const showSearchBar = (visible) => ({
  type: 'SHOW_SEARCHBAR',
  visible: visible || true,
});

export const showAppBar = (visible) => ({
  type: 'SHOW_APPBAR',
  visible: visible || true,
});

export const showBottomShortList = (visible) => ({
  type: 'SHOW_BOTTOM_SHORT_LIST',
  visible,
});

export const setOfficeShortList = (offices) => ({
  type: 'SET_OFFICE_SHORT_LIST',
  shortList: [...offices],
});

export const updateAppTitle = (title) => ({
  type: 'UPDATE_APP_TITLE',
  title,
});

export const changeLanguage = (language) => ({
  type: 'CHANGE_LANGUAGE',
  language,
});
