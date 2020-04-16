import { servicesCategories } from './constants';

/** Check email validation */
export function emailValidation(email) {
  return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
}

/**
 * Check office status
 *
 */
export function getOfficeStatus(office) {
  if (!office) return null;
  if (office.approved) return { status: 'approved', progress: 100 };
  if (office.rejected) return { status: 'rejected', progress: 100 };
  if (office.published) return { status: 'pendingForApprove', progress: 100 };

  if (
    !(
      office.title &&
      office.officeType &&
      office.pricemonthly &&
      office.location &&
      office.numberOfEmployees
    )
  ) {
    return { status: 'incomplete', progress: 20 };
  }
  if (
    !(
      office.coverPhotos &&
      office.coverPhotos.length >= 3 &&
      office.coverPhotos.length <= 15
    )
  ) {
    return { status: 'incomplete', progress: 40 };
  }
  let servicesAndAmenities = false;
  if (office.servicesAndAmenities) {
    servicesCategories.forEach((cat) => {
      if (
        office.servicesAndAmenities[cat.name] &&
        office.servicesAndAmenities[cat.name].length
      ) {
        servicesAndAmenities = true;
      }
    });
  }
  if (!servicesAndAmenities) return { status: 'incomplete', progress: 60 };

  return { status: 'unpublish', progress: 80 };
}

/**
 * Check profile status
 */
export function getProfileStatus(user, userRole) {
  let profileCompleted = 0;
  let profileCharged = 10;
  let profileCompleteness = null;

  if (user.generalInfo?.username || user.generalInfo?.phoneNumber) {
    profileCompleted += 30;
    profileCharged += 30;
  }

  if (user.avatar) {
    profileCompleted += 20;
    profileCharged += 20;
  }

  const documentTypes = {
    landlord: ['legalStatusDocuments', 'checkSpecimen', 'leases'],
    company: [
      'legalStatusDocuments',
      'checkSpecimen',
      'copyOfPhotoIds',
      'lastThreeBalances',
      'commercialBrochures',
    ],
  };
  const profile = user[`${userRole}Profile`];

  if (profile) {
    documentTypes[userRole].forEach((docType) => {
      if (profile[docType] && profile[docType].length) {
        profileCompleted += 10;
        profileCharged += 15;

        if (profile[docType].find((docItem) => docItem.approved === true)) {
          profileCompleted += 5;
        }
      }
    });
  }

  if (profileCompleted >= 90) {
    profileCompleted = 100;
  }

  profileCompleteness =
    profileCompleted === 100
      ? 'profileCompleted'
      : profileCompleted > 60
      ? 'profileNotComplete'
      : 'profileNeedAttention';

  return {
    completed: profileCompleted,
    charged: profileCharged,
    completeness: profileCompleteness,
  };
}
