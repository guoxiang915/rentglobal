export const showSearchBar = (visible) => ({
  type: 'SHOW_SEARCHBAR',
  visible: visible || true,
});

export const showAppBar = (visible) => ({
  type: 'SHOW_APPBAR',
  visible: visible || true,
});

export const updateAppTitle = (title) => ({
  type: 'UPDATE_APP_TITLE',
  title,
});

export const changeLanguage = (language) => ({
  type: 'CHANGE_LANGUAGE',
  language
});
