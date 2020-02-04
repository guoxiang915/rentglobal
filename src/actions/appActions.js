export const showSearchBar = visible => {
  return {
    type: "SHOW_SEARCHBAR",
    visible: visible ? visible : true
  };
};

export const showAppBar = visible => {
  return {
    type: "SHOW_APPBAR",
    visible: visible ? visible : true
  };
};

export const updateAppTitle = title => {
  return {
    type: "UPDATE_APP_TITLE",
    title
  };
};
