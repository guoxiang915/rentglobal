import api from '../api/api';

export const sendRequest = (method, url, headers, data) =>
  api({ method, url, data, headers })
    .then((response) => response)
    .catch((error) => error.response);

export const callApi = (endpoint, args) =>
  endpoint(args)
    .then((response) => response)
    .catch((error) => error.response);
