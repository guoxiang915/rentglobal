export const offices = [
  {
    title: "Title (or Short Description)",
    rating: 3.5,
    priceMonthly: 4500,
    officeType: "independentOffice",
    location: { fullAddress: "St 1, Toronto ON, Canada" },
    coverPhotos: [
      {
        bucketPath:
          "https://rentglobal.s3.us-east-2.amazonaws.com/2020/1/29309079d7289b1986/RENTGLOBAL_Logo_Preview_03.jpg",
      },
      {
        bucketPath:
          "https://rentglobal.s3.us-east-2.amazonaws.com/2020/1/29309079d7289b1986/RENTGLOBAL_Logo_Preview_03.jpg",
      },
      {
        bucketPath:
          "https://rentglobal.s3.us-east-2.amazonaws.com/2020/1/29309079d7289b1986/RENTGLOBAL_Logo_Preview_03.jpg",
      },
    ],
  },
  {
    title: "Title (or Short Description)",
    rating: 3.5,
    priceMonthly: 4500,
    officeType: "privateOffice",
    location: { fullAddress: "St 1, Toronto ON, Canada" },
    coverPhotos: [{}, {}, {}],
  },
  {
    title: "Title (or Short Description)",
    rating: 3.5,
    priceMonthly: 4500,
    officeType: "assignedWorkstation",
    location: { fullAddress: "St 1, Toronto ON, Canada" },
    coverPhotos: [{}, {}, {}],
    published: false,
  },
  {
    title: "Title (or Short Description)",
    rating: 3.5,
    priceMonthly: 4500,
    officeType: "unassignedWorkstation",
    location: { fullAddress: "St 1, Toronto ON, Canada" },
    coverPhotos: [{}, {}, {}],
    published: false,
  },
];

export const events = [
  {
    range: {
      start: new Date(2020, 5, 2, 16, 0, 0),
      end: new Date(2020, 5, 2, 18, 0, 30),
    },
    title: "Event 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    range: {
      start: new Date(2020, 4, 29, 1, 0, 10),
      end: new Date(2020, 4, 29, 5, 0, 30),
    },
    title: "Event 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export const visitRequests = [
  {
    date: new Date(2020, 5, 2),
    start: new Date(0, 0, 0, 1, 0, 10),
    end: new Date(0, 0, 0, 5, 0, 30),
    name: "Company 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    approved: true,
  },
  {
    date: new Date(2020, 4, 20),
    start: new Date(0, 0, 0, 19, 0, 50),
    end: new Date(0, 0, 0, 21, 0, 30),
    name: "Company 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export const reviews = [
  {
    company: {
      avatar: {},
      generalInfo: {
        username: "Company 1",
      },
      rating: 5,
    },
    createdAt: new Date(2019, 1, 21),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "rejected",
    rejected: {
      rejected: true,
      msg:
        "Reasons of rejection, Reasons of rejection, Reasons of rejection, Reasons of rejection, Reasons of rejection, Reasons of rejection, ",
      consultant: "Consultant1",
      datetime: new Date(2020, 4, 7, 13, 31),
    },
  },
  {
    company: {
      avatar: {},
      generalInfo: {
        username: "Company 2",
      },
      rating: 3,
    },
    createdAt: new Date(2018, 6, 13),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    status: "approved",
    approved: {
      approved: true,
      consultant: "Consultant3",
      datetime: new Date(2020, 4, 7, 13, 31),
    },
  },
  {
    company: {
      avatar: {},
      generalInfo: {
        username: "Company 3",
      },
    },
    createdAt: new Date(2019, 1, 21),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "underReview",
  },
  {
    company: {
      avatar: {},
      generalInfo: {
        username: "Company 4",
      },
      rating: 4.5,
    },
    createdAt: new Date(2018, 6, 13),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    status: "underReview",
  },
];

export const companyReviws = [
  {
    company: {
      avatar: {},
      generalInfo: {
        username: "Company 1",
      },
      rating: 5,
    },
    office: {
      title: "Office 1",
      rating: 5,
    },
    createdAt: new Date(2019, 1, 21),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    review: {
      msg:
        "Company reviewed here. Company reviewed here. Company reviewed here. Company reviewed here. Company reviewed here. Company reviewed here.",
    },
  },
  {
    company: {
      avatar: {},
      generalInfo: {
        username: "Company 2",
      },
      rating: 3,
    },
    office: {
      title: "Office 1",
      rating: 3,
    },
    createdAt: new Date(2018, 6, 13),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    review: {
      msg:
        "Company review here here. Company review here here.Company review here here.Company review here here.Company review here here.Company review here here.",
    },
    status: "approved",
    approved: {
      approved: true,
      consultant: "Consultant3",
      datetime: new Date(2020, 4, 7, 13, 31),
    },
  },
];

export const report = {
  visit: [
    { year: 2018, month: 3, count: 38 },
    { year: 2018, month: 5, count: 19 },
    { year: 2018, month: 2, count: 7 },
    { year: 2018, month: 1, count: 22 },
    { year: 2018, month: 0, count: 14 },
    { year: 2019, month: 1, count: 96 },
    { year: 2019, month: 2, count: 17 },
    { year: 2019, month: 3, count: 22 },
    { year: 2018, month: 7, count: 14 },
    { year: 2018, month: 8, count: 102 },
    { year: 2020, month: 0, count: 11 },
    { year: 2020, month: 1, count: 4 },
    { year: 2020, month: 3, count: 55 },
  ],
  lease: [
    { year: 2018, month: 3, count: 8 },
    { year: 2018, month: 5, count: 9 },
    { year: 2018, month: 2, count: 7 },
    { year: 2019, month: 2, count: 5 },
    { year: 2019, month: 3, count: 2 },
    { year: 2018, month: 7, count: 14 },
    { year: 2018, month: 8, count: 32 },
    { year: 2020, month: 0, count: 1 },
    { year: 2020, month: 3, count: 5 },
  ],
  view: [
    { year: 2018, month: 3, count: 48 },
    { year: 2018, month: 5, count: 59 },
    { year: 2018, month: 2, count: 27 },
    { year: 2018, month: 1, count: 12 },
    { year: 2018, month: 0, count: 34 },
    { year: 2018, month: 11, count: 119 },
    { year: 2019, month: 1, count: 76 },
    { year: 2019, month: 2, count: 37 },
    { year: 2019, month: 7, count: 27 },
    { year: 2019, month: 3, count: 24 },
    { year: 2018, month: 7, count: 64 },
    { year: 2018, month: 8, count: 62 },
    { year: 2020, month: 0, count: 41 },
    { year: 2020, month: 1, count: 34 },
    { year: 2020, month: 2, count: 24 },
    { year: 2020, month: 3, count: 40 },
    { year: 2020, month: 6, count: 64 },
    { year: 2020, month: 9, count: 55 },
  ],
  income: [
    { year: 2018, month: 3, count: 1928 },
    { year: 2018, month: 5, count: 229 },
    { year: 2018, month: 2, count: 4437 },
    { year: 2019, month: 2, count: 2225 },
    { year: 2019, month: 3, count: 3422 },
    { year: 2018, month: 8, count: 39992 },
    { year: 2020, month: 3, count: 335 },
  ],
};

export const conditions = [
  {
    dayTypes: ["allDays"],
    appliedDates: {
      start: new Date(2020, 3, 6),
      end: new Date(2020, 9, 30),
    },
    duration: {
      start: new Date(0, 0, 0, 4, 30),
      end: new Date(0, 0, 0, 11, 20),
    },
    officeType: "allOffices",
  },
  {
    dayTypes: ["weekends"],
    duration: {
      start: new Date(0, 0, 0, 12, 30),
      end: new Date(0, 0, 0, 15, 0),
    },
    officeType: "allOffices",
  },
  {
    dayTypes: ["allDays"],
    appliedDates: {
      start: new Date(2020, 5, 6),
    },
    duration: {
      start: new Date(0, 0, 0, 18, 0),
      end: new Date(0, 0, 0, 10, 30),
    },
    officeType: "allOffices",
  },
];

export const notifications = [
  {
    type: "officeReviewed",
    payload: {
      generalInfo: { username: "Company 1" },
      rating: 5,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    createdAt: new Date(),
  },
  {
    type: "newFeature",
    payload: {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    createdAt: new Date(),
  },
  {
    type: "profileNeedAttention",
    payload: {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    createdAt: new Date(),
  },
  {
    type: "officeReviewRejected",
    payload: {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    createdAt: new Date(),
  },
  {
    type: "emailVerified",
    payload: {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    createdAt: new Date(),
  },
  {
    type: "officeAvailable",
    payload: {
      office: { name: "Office 1" },
      rating: 4.5,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    createdAt: new Date(),
  },
  {
    type: "visitRequestChange",
    payload: {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    createdAt: new Date(),
  },
];
