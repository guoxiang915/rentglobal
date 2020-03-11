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
  "3 months Lease",
  "6 months Lease",
  "9 months Lease",
  "Sublease"
];
const guarantees = ["1 month", "2 month", "3 month"];
const checkOutNotices = ["1 month", "2 month", "3 month"];

export { API, officeTypes, contractTypes, guarantees, checkOutNotices };
