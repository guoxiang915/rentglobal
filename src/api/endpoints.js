import api from "./api";

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
    headers: { "Content-Type": undefined }
  };
  return api.post("/file/upload", formData, config);
};

/**
 * Download file from api
 * @param {string} fileId id of file to download
 * @param {string} fileName name of file to be downloaded
 */
export const downloadFile = (fileId, fileName) => {
  api.get(`/file/${fileId}`, { responseType: "blob" }).then(response => {
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
export const getProfile = () => {
  return api.get("/users/me");
};

/** Call api to delete user document */
export const deleteUserDocument = role => (docType, docFile) => {
  return api.delete(`/users/me/delete/document?role=${role}`, {
    data: {
      document: docType,
      documentFileId: docFile._id
    }
  });
};

/** Call api to get office list */
export const getOffices = () => {
  return api.get("/users/me/offices");
};

/** Call api to get office from id */
export const getOfficeById = officeId => {
  return api.get(`/users/me/offices/${officeId}`);
};

/** Call api to create office */
export const createOffice = office => {
  return api.post("/offices/create", office);
};

/** Call api to update office */
export const updateOffice = office => {
  return api.put(`/users/me/offices/${office._id}`, { office });
};

/** Call api to save cover-photos */
export const createOfficeCoverPhotos = payload => {
  return api.post("/offices/create/cover-photos", payload);
};

/** Call api to save services & amenities of office */
export const createOfficeServicesAmenities = payload => {
  return api.post("/offices/create/services-amenities", payload);
};

/** Call api to publish office */
export const publishOffice = officeId => {
  return api.put(`/offices/publish/${officeId}`);
};

/** Call api to unpublish office */
export const unpublishOffice = officeId => {
  return api.put(`/offices/unpublish/${officeId}`);
};

/** Call api to delete office photo */
export const deleteOfficePhoto = (officeId, photoId) => {
  return api.delete(`/offices/delete/${officeId}/cover-photos/${photoId}`);
};

/** Call api to delete office */
export const deleteOffice = officeId => {
  return api.delete(`/offices/delete/${officeId}`);
};
