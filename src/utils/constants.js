/**
 * API url
 * In development mode, url is local server's url
 */
const API =
  process.env.NODE_ENV === "production"
    ? "https://rentglobal-backend.herokuapp.com"
    : "http://localhost:3001";

/**
 * Office types
 */
const officeTypes = [
  "independentOffice",
  "privateOffice",
  "assignedWorkstation",
  "unassignedWorkstation"
];
const contractTypes = [
  "independentOffice",
  "privateOffice",
  "assignedWorkstation",
  "unassignedWorkstation"
];
const guarantees = [
  "independentOffice",
  "privateOffice",
  "assignedWorkstation",
  "unassignedWorkstation"
];
const checkOutNotices = [
  "independentOffice",
  "privateOffice",
  "assignedWorkstation",
  "unassignedWorkstation"
];

export { API, officeTypes, contractTypes, guarantees, checkOutNotices };
