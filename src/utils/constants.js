import {
  UserIcon,
  BasicsServiceIcon,
  CommunityServiceIcon,
  ZonesServiceIcon,
  FacilitiesServiceIcon,
  TransportationServiceIcon,
  CateringServiceIcon,
  EquipmentServiceIcon,
  CoolStuffServiceIcon,
  RulesServiceIcon,
} from "../common/base-components";

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
  "unassignedWorkstation",
];
const contractTypes = [
  "serviceContract",
  "sublease",
  "shortTermLease",
  "longTermLease",
];
const guarantees = ["oneMonth", "twoMonths", "threeMonths"];
const checkOutNotices = ["oneMonth", "twoMonths", "threeMonths"];

/** Categories */
const servicesCategories = [
  {
    name: "basics",
    value: "basics",
    icon: BasicsServiceIcon,
    options: [
      { name: "highSpeedWifi", value: "highSpeedWifi" },
      { name: "privateWifi", value: "privateWifi" },
      { name: "rj45Cable", value: "rj45Cable" },
      { name: "reception", value: "reception" },
      { name: "mailReception", value: "mailReception" },
      { name: "meetingRoom", value: "meetingRoom" },
      { name: "privateMeetingRoom", value: "privateMeetingRoom" },
      { name: "securitySystem", value: "securitySystem" },
      { name: "cleaningService", value: "cleaningService" },
      { name: "furniture", value: "furniture" },
      { name: "heating", value: "heating" },
      { name: "airConditioning", value: "airConditioning" },
    ],
  },
  {
    name: "community",
    value: "community",
    icon: CommunityServiceIcon,
    options: [
      { name: "events", value: "events" },
      { name: "workshops", value: "workshops" },
      { name: "communityLunches", value: "communityLunches" },
      { name: "communityDrinks", value: "communityDrinks" },
      { name: "mentorshipPrograms", value: "mentorshipPrograms" },
      { name: "pitchingEvents", value: "pitchingEvents" },
      { name: "incubatorPrograms", value: "incubatorPrograms" },
      { name: "acceleratorPrograms", value: "acceleratorPrograms" },
      { name: "toastmasters", value: "toastmasters" },
    ],
  },
  {
    name: "zones",
    value: "zones",
    icon: ZonesServiceIcon,
    options: [
      { name: "outdoorTerrace", value: "outdoorTerrace" },
      { name: "swimmingPool", value: "swimmingPool" },
      { name: "longueChilloutArea", value: "longueChilloutArea" },
      { name: "napRoom", value: "napRoom" },
      { name: "meditationRoom", value: "meditationRoom" },
    ],
  },
  {
    name: "facilities",
    value: "facilities",
    icon: FacilitiesServiceIcon,
    options: [
      { name: "kitchen", value: "kitchen" },
      { name: "coLivingAccommodation", value: "coLivingAccommodation" },
      { name: "childcare", value: "childcare" },
      { name: "makerspace", value: "makerspace" },
      { name: "storage", value: "storage" },
      { name: "personalLockers", value: "personalLockers" },
      { name: "showers", value: "showers" },
      { name: "phoneBooth", value: "phoneBooth" },
      { name: "eventSpaceForRent", value: "eventSpaceForRent" },
    ],
  },
  {
    name: "transportation",
    value: "transportation",
    icon: TransportationServiceIcon,
    options: [
      { name: "freeParkingOnPremise", value: "freeParkingOnPremise" },
      { name: "paidParkingOffPremise", value: "paidParkingOffPremise" },
      { name: "bikeParking", value: "bikeParking" },
      { name: "bikeStorage", value: "bikeStorage" },
      { name: "carShare", value: "carShare" },
      {
        name: "fiveMinuteWalkFromPublicTransit",
        value: "fiveMinuteWalkFromPublicTransit",
      },
      {
        name: "tenMinuteWalkFromPublicTransit",
        value: "tenMinuteWalkFromPublicTransit",
      },
      { name: "pluginForElectricCars", value: "pluginForElectricCars" },
    ],
  },
  {
    name: "catering",
    value: "catering",
    icon: CateringServiceIcon,
    options: [
      { name: "freeDrinkingWater", value: "freeDrinkingWater" },
      { name: "freeCoffee", value: "freeCoffee" },
      { name: "microwave", value: "microwave" },
      { name: "refrigerator", value: "refrigerator" },
    ],
  },
  {
    name: "equipment",
    value: "equipment",
    icon: EquipmentServiceIcon,
    options: [
      { name: "printer", value: "printer" },
      { name: "scanner", value: "scanner" },
      { name: "photocopier", value: "photocopier" },
      { name: "computersPcs", value: "computersPcs" },
      { name: "computersMacs", value: "computersMacs" },
      { name: "projector", value: "projector" },
    ],
  },
  {
    name: "coolStuff",
    value: "coolStuff",
    icon: CoolStuffServiceIcon,
    options: [
      { name: "poolTable", value: "poolTable" },
      { name: "pingPongTable", value: "pingPongTable" },
      { name: "library", value: "library" },
      { name: "dogFriendly", value: "dogFriendly" },
      { name: "catFriendly", value: "catFriendly" },
      { name: "gym", value: "gym" },
      { name: "boardGames", value: "boardGames" },
      { name: "darts", value: "darts" },
      { name: "arcadeGames", value: "arcadeGames" },
      { name: "laundryService", value: "laundryService" },
    ],
  },
  {
    name: "rules",
    value: "rules",
    icon: RulesServiceIcon,
    options: [
      { name: "noSmoking", value: "noSmoking" },
      { name: "noPets", value: "noPets" },
      { name: "noParties", value: "noParties" },
      { name: "mustClimbStairs", value: "mustClimbStairs" },
      { name: "securityDeposit", value: "securityDeposit" },
    ],
  },
  {
    name: "custom",
    value: "custom",
    icon: UserIcon,
    options: [],
  },
];

const maxFileSize = 10485760; // 10 MB

const weekdays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const shortWeekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const companyOfficeSortOptions = [
  { title: "alphabetical", field: "title", direction: "desc" },
  { title: "mostRecent", field: "createdAt", direction: "desc" },
];

const officeSortOptions = [
  { title: "available", field: "createdAt", direction: "desc" },
  { title: "dateOldToNew", field: "createdAt", direction: "asc" },
  { title: "topRatedFirst", field: "rating", direction: "desc" },
];

const searchSortOptions = [
  { title: "priceHighToLow", field: "price", direction: "desc" },
  { title: "priceLowToHigh", field: "price", direction: "asc" },
  { title: "dateNewToOld", field: "createdAt", direction: "desc" },
  { title: "dateOldToNew", field: "createdAt", direction: "asc" },
  { title: "topRatedFirst", field: "rating", direction: "desc" },
];

const reviewSortOptions = [
  { title: "approved", field: "approved", direction: "desc" },
  { title: "latest", field: "createdAt", direction: "desc" },
];

const notificationTypes = {
  OFFICE_CREATED: "officeCreated",
  OFFICE_PUBLISHED: "officePublished",
  OFFICE_UNPUBLISHED: "officeUnpublished",
  OFFICE_APPROVED: "officeApproved",
  OFFICE_REJECTED: "officeRejected",
  DOCUMENT_UPLOADED: "documentUploaded",
  DOCUMENT_APPROVED: "documentApproved",
  DOCUMENT_REJECTED: "documentRejected",
  OFFICE_REVIEWED: "officeReviewed",
  NEW_FEATURE: "newFeature",
  PROFILE_NEED_ATTENTION: "profileNeedAttention",
  OFFICE_REVIEW_APPROVED: "officeReviewApproved",
  OFFICE_REVIEW_REJECTED: "officeReviewRejected",
  EMAIL_VERIFIED: "emailVerified",
  OFFICE_FREED: "officeFreed",
  OFFICE_AVAILABLE: "officeAvailable",
  VISIT_REQUEST_CHANGE: "visitRequestChange",
};

/** Calendar settings */
const dayTypes = ["allDays", "businessDays", "weekends"];

export {
  API,
  officeTypes,
  contractTypes,
  guarantees,
  checkOutNotices,
  servicesCategories,
  maxFileSize,
  weekdays,
  shortWeekdays,
  months,
  companyOfficeSortOptions,
  officeSortOptions,
  reviewSortOptions,
  notificationTypes,
  searchSortOptions,
  dayTypes,
};
