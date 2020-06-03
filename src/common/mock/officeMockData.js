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
          "https://rentglobal.s3.us-east-2.amazonaws.com/2020/1/29309079d7289b1986/RENTGLOBAL_Logo_Preview_03.jpg"
      },
      {
        bucketPath:
          "https://rentglobal.s3.us-east-2.amazonaws.com/2020/1/29309079d7289b1986/RENTGLOBAL_Logo_Preview_03.jpg"
      },
      {
        bucketPath:
          "https://rentglobal.s3.us-east-2.amazonaws.com/2020/1/29309079d7289b1986/RENTGLOBAL_Logo_Preview_03.jpg"
      }
    ]
  },
  {
    title: "Title (or Short Description)",
    rating: 3.5,
    priceMonthly: 4500,
    officeType: "privateOffice",
    location: { fullAddress: "St 1, Toronto ON, Canada" },
    coverPhotos: [{}, {}, {}]
  },
  {
    title: "Title (or Short Description)",
    rating: 3.5,
    priceMonthly: 4500,
    officeType: "assignedWorkstation",
    location: { fullAddress: "St 1, Toronto ON, Canada" },
    coverPhotos: [{}, {}, {}],
    published: false
  },
  {
    title: "Title (or Short Description)",
    rating: 3.5,
    priceMonthly: 4500,
    officeType: "unassignedWorkstation",
    location: { fullAddress: "St 1, Toronto ON, Canada" },
    coverPhotos: [{}, {}, {}],
    published: false
  }
];

export const events = [
  {
    type: "visit",
    date: new Date(2020, 5, 2),
    start: new Date(0, 0, 0, 1, 0, 10),
    end: new Date(0, 0, 0, 5, 0, 30),
    name: "Company 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    type: "event",
    date: new Date(2020, 5, 2),
    start: new Date(0, 0, 0, 16, 0, 0),
    end: new Date(0, 0, 0, 18, 0, 30),
    name: "Event 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    type: "event",
    date: new Date(2020, 4, 29),
    start: new Date(0, 0, 0, 1, 0, 10),
    end: new Date(0, 0, 0, 5, 0, 30),
    name: "Event 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    type: "visit",
    date: new Date(2020, 4, 20),
    start: new Date(0, 0, 0, 19, 0, 50),
    end: new Date(0, 0, 0, 21, 0, 30),
    name: "Company 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }
];

export const reviews = [
  {
    company: {
      avatar: {},
      generalInfo: {
        username: "Company 1"
      }
    },
    createdAt: new Date(2019, 1, 21),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    company: {
      avatar: {},
      generalInfo: {
        username: "Company 2"
      }
    },
    createdAt: new Date(2018, 6, 13),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    approved: true
  },
  {
    company: {
      avatar: {},
      generalInfo: {
        username: "Company 3"
      }
    },
    createdAt: new Date(2019, 1, 21),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    company: {
      avatar: {},
      generalInfo: {
        username: "Company 4"
      }
    },
    createdAt: new Date(2018, 6, 13),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
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
    { year: 2020, month: 3, count: 55 }
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
    { year: 2020, month: 3, count: 5 }
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
    { year: 2020, month: 9, count: 55 }
  ],
  income: [
    { year: 2018, month: 3, count: 1928 },
    { year: 2018, month: 5, count: 229 },
    { year: 2018, month: 2, count: 4437 },
    { year: 2019, month: 2, count: 2225 },
    { year: 2019, month: 3, count: 3422 },
    { year: 2018, month: 8, count: 39992 },
    { year: 2020, month: 3, count: 335 }
  ]
};
