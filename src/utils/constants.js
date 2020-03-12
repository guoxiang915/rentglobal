import { UserIcon } from "../common/base-components";


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

/** Categories */
const servicesCategories = [
  {
    name: "categoryName1",
    value: "category1",
    icon: UserIcon,
    options: [
      { name: "wifi", value: "wifi" },
      { name: "privateWifi", value: "privateWifi" },
      { name: "rj45Cable", value: "rj45Cable" },
      { name: "cleaningService", value: "cleaningService" },
      { name: "furniture", value: "furniture" },
      { name: "coffeeAndTea", value: "coffeeAndTea" }
    ]
  },
  {
    name: "categoryName2",
    value: "category12",
    icon: UserIcon,
    options: [
      { name: "airConditioner", value: "airConditioner" },
      { name: "shower", value: "shower" },
      { name: "reception", value: "reception" },
      { name: "cateringFacilities", value: "cateringFacilities" },
      { name: "meetingRoom", value: "meetingRoom" }
    ]
  },
  {
    name: "categoryName3",
    value: "category3",
    icon: UserIcon,
    options: [
      { name: "receptionist", value: "receptionist" },
      { name: "mailReception", value: "mailReception" },
      { name: "privateMeetingRoom", value: "privateMeetingRoom" },
      { name: "residency", value: "residency" },
      { name: "accessByBadge", value: "accessByBadge" },
      { name: "petsAllowed", value: "petsAllowed" },
      { name: "kitchen", value: "kitchen" },
      { name: "alarm", value: "alarm" },
      { name: "storage", value: "storage" },
      { name: "privateStorage", value: "privateStorage" },
      { name: "disabledAccess", value: "disabledAccess" },
      { name: "parking", value: "parking" },
      { name: "bikeParking", value: "bikeParking" },
      { name: "elevator", value: "elevator" }
    ]
  },
  {
    name: "categoryName4",
    value: "category4",
    icon: UserIcon,
    options: [
      { name: "rooftop", value: "rooftop" },
      { name: "gym", value: "gym" },
      { name: "restRoom", value: "restRoom" }
    ]
  },
  {
    name: "categoryName5",
    value: "category5",
    icon: UserIcon,
    options: [{ name: "wifi", value: "wifi" }]
  },
  {
    name: "categoryName6",
    value: "category6",
    icon: UserIcon,
    options: [{ name: "wifi", value: "wifi" }]
  }
];

export {
  API,
  officeTypes,
  contractTypes,
  guarantees,
  checkOutNotices,
  servicesCategories
};
