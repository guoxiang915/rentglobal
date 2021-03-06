import api from "./api";
import {
  events as eventsMockData,
  visitRequests as visitRequestsMockData,
  reviews as reviewsMockData,
  companyReviws as companyReviewsMockData,
  report as reportMockData,
  conditions as conditionsMockData,
} from "../common/mock/officeMockData";

/**
 * Upload file to the api
 * @param {File} file File object to upload
 * @param {string} permission "public-read" or "private"
 */
export const uploadFile = (file, permission) => {
  const formData = new FormData();
  formData.append("file", file);
  if (permission) {
    formData.append("permission", permission);
  }
  const config = {
    headers: { "Content-Type": undefined },
  };
  return api.post("/file/upload/", formData, config);
};

/**
 * Download file from api
 * @param {string} fileId id of file to download
 * @param {string} fileName name of file to be downloaded
 */
export const downloadFile = (fileId, fileName) => {
  api.get(`/file/${fileId}/`, { responseType: "blob" }).then((response) => {
    const url = window.URL.createObjectURL(response.data);
    const el = document.createElement("a");

    el.href = url;
    el.download = fileName;
    el.style.display = "none";
    document.body.appendChild(el);
    el.click();

    document.body.removeChild(el);
    window.URL.revokeObjectURL(url);
  });
};

/** Call api to get user profile */
export const getProfile = () => api.get("/users/me/");

/** Call api to delete user avatar */
export const deleteUserAvatar = () => api.delete(`/users/me/delete/avatar`);

/** Call api to get user document */
export const getUserDocument = () => api.get(`/users/me/documents/`);

/** Call api to delete user document */
export const deleteUserDocument = ({ userRole, docType, docFile }) =>
  api.delete(`/users/me/delete/document?role=${userRole}`, {
    data: {
      document: docType,
      documentFileId: docFile._id,
    },
  });

export const deleteUserAccount = () => api.delete(`/users/me/delete`);

/** Call api to get company office list */
export const getOffices = (params) => api.get("/offices", { params });

/** Call api to get company recent view offices */
export const getRecentViewOffices = (params) => getOffices(params);

/** Call api to get company offices history */
export const getOfficesHistory = (params) => getOffices(params);

/** Call api to get favorite offices */
export const getFavoriteOffices = (params) =>
  getOffices({ ...params, searchParams: "favorite" });

/** Call api to get landlord office list */
export const getLandlordOffices = (params) =>
  api.get("/users/me/offices/", { params });

/**
 * Call api to get landlord's approved office list
 * @deprecated
 */
export const getLandlordApprovedOffices = (params) =>
  getLandlordOffices({ ...params, approved: true });

/**
 * Call api to get landlord's unapproved office list
 * @deprecated
 */
export const getLandlordUnapprovedOffices = (params) =>
  getLandlordOffices({ ...params, approved: false });

/** Call api to get office from id */
export const getOfficeById = (officeId) =>
  api.get(`/users/me/offices/${officeId}/`);

/** Call api to create office */
export const createOffice = (office) => api.post("/offices/", office);

/** Call api to update office */
export const updateOffice = (office) =>
  api.put(`/users/me/offices/${office._id}/`, { office });

/** Call api to save services & amenities of office */
export const createOfficeServicesAmenities = (officeId, payload) =>
  api.put(`/offices/${officeId}/services-amenities/`, payload);

/** Call api to add visibility */
export const addVisibility = (officeId, payload) =>
  api.post(`/offices/${officeId}/visit-hours/`, payload);

/** Call api to get visibilities */
export const getVisibilities = (officeId, params) =>
  api.get(`/offices/${officeId}/visit-hours/`, { params });

/** Call api to update visibility */
export const updateVisibility = (officeId, visitHourId, payload) =>
  api.put(`/offices/${officeId}/visit-hours/${visitHourId}/`, payload);

/** Call api to delete visibility */
export const deleteVisibility = (officeId, visitHourId, payload) =>
  api.delete(`/offices/${officeId}/visit-hours/${visitHourId}/`, payload);

/** Call api to publish office */
export const publishOffice = (officeId) =>
  api.put(`/offices/${officeId}/publish/`);

/** Call api to unpublish office */
export const unpublishOffice = (officeId) =>
  api.put(`/offices/${officeId}/unpublish/`);

/** Call api to upload office photo */
export const uploadOfficePhoto = (officeId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  const config = { headers: { "Content-Type": undefined } };
  return api.post(
    `/offices/${officeId}/cover-photos/upload/`,
    formData,
    config
  );
};

/** Call api to delete office photo */
export const deleteOfficePhoto = (officeId, photoId) =>
  api.delete(`/offices/${officeId}/cover-photos/${photoId}/`);

/** Call api to delete office */
export const deleteOffice = (officeId) => api.delete(`/offices/${officeId}/`);

/** Call api to set favorite office */
export const favoriteOffice = (officeId) =>
  api.put(`/offices/${officeId}/favorite/`);

/** Call api to search offices with advanced filters */
export const advancedSearchOffices = (payload) =>
  api.post("/offices/advanced-search/", payload);

/** Call api to summary locations */
export const locationSummary = (params) =>
  api.get("/offices/location-summary/", { params });

/** Call api to get all published offices */
export const getPublishedOffices = (params) => api.get("/offices/", { params });

/**
 * Call api to get all approved offices
 * @deprecated for now, admin doesn't exist, and call api for getting published offices
 */
export const getApprovedOffices = (params) => getPublishedOffices(params);

/**
 * Call api to get recommended offices
 * @deprecated for now, call api for getting all published offices
 */
export const getRecommendedOffices = () => getPublishedOffices();

export const getApprovedOfficeByRefId = (refId) =>
  api.get(`/offices/ref/${refId}/`);

/**
 * Call api to get office by id
 */
export const getApprovedOfficeById = (officeId) =>
  api.get(`/offices/${officeId}/`);

export const getPlaceDetails = (key, lat, lng, type) =>
  api.get(
    `/api/place/nearbysearch/json?location=${lat},${lng}&radius=400&type=${type}&key=${key}`,
    { baseURL: "https://maps.googleapis.com/maps" }
  );

/**
 * Call api to get consultant for office by office id
 */
export const getConsultantByOffice = () =>
  // For now using mock data
  Promise.resolve({
    status: 200,
    data: {
      generalInfo: {
        username: "Consultant Name",
        phoneNumber: { number: "111-222-3333", verified: false },
      },
      avatar: {},
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  });
// return api.get(`/offices/${officeId}/user/`);

/**
 * Call api to get reviews of office
 */
export const getReviewsByOffice = () =>
  Promise.resolve({ status: 200, data: reviewsMockData });

export const getReviewsByCompany = () =>
  Promise.resolve({ status: 200, data: companyReviewsMockData });

/**
 * Call api to get events of office
 * @param {string} officeId Office id for getting events data
 */
export const getEventsByOffice = (officeId) => {
  return api.get(`/offices/${officeId}/events/`);
};

/**
 * Call api to add event of office
 * @param {string} officeId Office id for getting events data
 */
export const addEventByOffice = (officeId, payload) => {
  return api.post(`/offices/${officeId}/events/`, payload);
};

/**
 * Call api to get visit request of office landlord
 * @param {string} officeId Office id for getting visit requests
 */
export const getVisitRequestsByOffice = (officeId) =>
  Promise.resolve({ status: 200, data: visitRequestsMockData });

/**
 * Call api to get events of landlord
 */
export const getEventsByLandlord = () =>
  Promise.resolve({ status: 200, data: eventsMockData });

/**
 * Call api to get visit request of office landlord
 * @param {string} officeId Office id for getting visit requests
 */
export const getVisitRequestsByLandlord = () =>
  Promise.resolve({ status: 200, data: visitRequestsMockData });

/**
 * Call api to get conditions of landlord calendar
 */
export const getLandlordCalendarSettings = () => {
  return api.get(`/landlord/calendar-settings/`);
};

/**
 * Call api to get conditions of landlord calendar
 */
export const getGeneralConditionsOfCalendar = () =>
  Promise.resolve({ status: 200, data: conditionsMockData });

/**
 * Call api to add new condition
 */
export const addLandlordCalendarSetting = (condition) => {
  return api.post(`/landlord/calendar-settings/setting/`, condition);
};

/**
 * Call api to update condition
 */
export const updateLandlordCalendarSetting = (id, condition) => {
  return api.put(`/landlord/calendar-settings/${id}/`, condition);
};

/**
 * Call api to delete condition
 */
export const deleteLandlordCalendarSetting = (id) => {
  return api.delete(`/landlord/calendar-settings/${id}/`);
};

/**
 * Mock api to get office from event
 */
export const getOfficeByEvent = () => {
  return new Promise((resolve, reject) =>
    getPublishedOffices().then(
      (res) => {
        resolve({ status: 200, data: res.data.docs[0] });
      },
      (err) => reject(err)
    )
  );
};

/**
 * Call api to get events of office
 * @param {string} officeId Office id for getting events data
 */
export const getReportByOffice = () =>
  Promise.resolve({ status: 200, data: reportMockData });

/**
 * Call api to get similar offices
 * @deprecated for now, admin doesn't exist, and call api for getting published offices
 */
export const getSimilarOffices = (officeId) =>
  api.get(`/offices/${officeId}/similar/`);

/** Call api to verify phone number */
export const verifyPhoneNumber = (phoneNumber) =>
  api.post("/users/me/verify-phone-number", phoneNumber);

/** Call api to verify phone code */
export const verifyPhoneCode = (phoneCode) =>
  api.post("/users/me/confirm-phone-code", phoneCode);
