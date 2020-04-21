import api from './api';
import { reviews as reviewsMockData } from '../common/mock/officeMockData';

/**
 * Upload file to the api
 * @param {File} file File object to upload
 * @param {string} permission "public-read" or "private"
 */
export const uploadFile = (file, permission) => {
  const formData = new FormData();
  formData.append('file', file);
  if (permission) {
    formData.append('permission', permission);
  }
  const config = {
    headers: { 'Content-Type': undefined },
  };
  return api.post('/file/upload/', formData, config);
};

/**
 * Download file from api
 * @param {string} fileId id of file to download
 * @param {string} fileName name of file to be downloaded
 */
export const downloadFile = (fileId, fileName) => {
  api.get(`/file/${fileId}/`, { responseType: 'blob' }).then((response) => {
    const url = window.URL.createObjectURL(response.data);
    const el = document.createElement('a');

    el.href = url;
    el.download = fileName;
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();

    document.body.removeChild(el);
    window.URL.revokeObjectURL(url);
  });
};

/** Call api to get user profile */
export const getProfile = () => api.get('/users/me/');

/** Call api to delete user document */
export const deleteUserDocument = ({ userRole, docType, docFile }) => api.delete(`/users/me/delete/document?role=${userRole}`, {
  data: {
    document: docType,
    documentFileId: docFile._id,
  },
});

/** Call api to get office list */
export const getOffices = () => api.get('/users/me/offices/');

/**
 * Call api to get available office list
 * @deprecated
 */
export const getAvailableOffices = () => getOffices();

/**
 * Call api to get unpublished office list
 * @deprecated
 */
export const getUnpublishedOffices = () => getOffices();

/** Call api to get office from id */
export const getOfficeById = (officeId) => api.get(`/users/me/offices/${officeId}/`);

/** Call api to create office */
export const createOffice = (office) => api.post('/offices/', office);

/** Call api to update office */
export const updateOffice = (office) => api.put(`/users/me/offices/${office._id}/`, { office });

/** Call api to save services & amenities of office */
export const createOfficeServicesAmenities = (officeId, payload) => api.put(`/offices/${officeId}/services-amenities/`, payload);

/** Call api to publish office */
export const publishOffice = (officeId) => api.put(`/offices/${officeId}/publish/`);

/** Call api to unpublish office */
export const unpublishOffice = (officeId) => api.put(`/offices/${officeId}/unpublish/`);

/** Call api to upload office photo */
export const uploadOfficePhoto = (officeId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  const config = { headers: { 'Content-Type': undefined } };
  return api.post(
    `/offices/${officeId}/cover-photos/upload/`,
    formData,
    config,
  );
};

/** Call api to delete office photo */
export const deleteOfficePhoto = (officeId, photoId) => api.delete(`/offices/${officeId}/cover-photos/${photoId}/`);

/** Call api to delete office */
export const deleteOffice = (officeId) => api.delete(`/offices/${officeId}/`);

/** Call api to set favorite office */
export const favoriteOffice = (officeId) => api.put(`/offices/${officeId}/favorite/`);

/** Call api to get all published offices */
export const getPublishedOffices = () => api.get('/offices/');

/**
 * Call api to get all approved offices
 * @deprecated for now, admin doesn't exist, and call api for getting published offices
 */
export const getApprovedOffices = () => getPublishedOffices();

/**
 * Call api to get recommended offices
 * @deprecated for now, call api for getting all published offices
 */
export const getRecommendedOffices = () => getPublishedOffices();

/**
 * Call api to get office by id
 */
export const getApprovedOfficeById = (officeId) => api.get(`/offices/${officeId}/`);

/**
 * Call api to get consultant for office by office id
 */
export const getConsultantByOffice = () =>
  // For now using mock data
  Promise.resolve({
    status: 200,
    data: {
      generalInfo: {
        username: 'Consultant Name',
        phoneNumber: { number: '111-222-3333', verified: false },
      },
      avatar: {},
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  });
// return api.get(`/offices/${officeId}/user/`);

/**
 * Call api to get reviews of office
 */
export const getReviewsByOffice = () => Promise.resolve({ status: 200, data: reviewsMockData });

/**
 * Call api to get similar offices
 * @deprecated for now, admin doesn't exist, and call api for getting published offices
 */
export const getSimilarOffices = () => getPublishedOffices();
