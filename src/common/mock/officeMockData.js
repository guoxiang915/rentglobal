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
