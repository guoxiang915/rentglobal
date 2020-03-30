import { servicesCategories } from "./constants";

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
  if (office.approved) return { status: "approved", progress: 100 };
  if (office.rejected) return { status: "rejected", progress: 100 };
  if (office.published) return { status: "pendingForApprove", progress: 100 };

  if (
    !(
      office.title &&
      office.officeType &&
      office.pricemonthly &&
      office.location &&
      office.numberOfEmployees
    )
  )
    return { status: "incompleteGeneralInfo", progress: 20 };
  if (
    !(
      office.coverPhotos &&
      office.coverPhotos.length >= 3 &&
      office.coverPhotos.length <= 15
    )
  )
    return { status: "incompleteCoverPhotos", progress: 40 };
  let servicesAndAmenities = false;
  if (office.servicesAndAmenities) {
    servicesCategories.forEach(cat => {
      if (
        office.servicesAndAmenities[cat.name] &&
        office.servicesAndAmenities[cat.name].length
      ) {
        servicesAndAmenities = true;
      }
    });
  }
  if (!servicesAndAmenities)
    return { status: "incompleteServicesAndAmenities", progress: 60 };

  return { status: "unpublished", progress: 80 };
}

/**
 * Check profile status
 */
export function getProfileStatus(profile) {}
