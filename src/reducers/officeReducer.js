const INITIAL_STATE = {
  isLoading: false,
  error: null,
  office: null,
};

const officeReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CREATE_OFFICE':
    return {
      ...currentState,
      isLoading: true,
    };

  case 'CREATE_OFFICE_SUCCESS':
    return {
      ...currentState,
      isLoading: false,
      office: action.resp.msg,
    };

  case 'CREATE_OFFICE_FAILED':
    return {
      ...currentState,
      isLoading: false,
      error: action.resp.msg,
    };

  default:
    return currentState;
  }
};

export default officeReducer;
