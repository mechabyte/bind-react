import { gql } from "@apollo/client";
import COMPLETED_PROFILE_SUMMARY_FRAGMENT from '../fragments/completed-profile-summary';
import COMPLETED_PROFILE_ADD_DRIVER_FRAGMENT from '../fragments/completed-profile-add-driver-form'
import COMPLETED_PROFILE_ADD_VEHICLE_FRAGMENT from '../fragments/completed-profile-add-vehicle-form'
import COMPLETED_PROFILE_EDIT_DRIVER_FRAGMENT from '../fragments/completed-profile-edit-driver-form';
import COMPLETED_PROFILE_EDIT_VEHICLE_FRAGMENT from '../fragments/completed-profile-edit-vehicle-form';
import INCOMPLETE_PROFILE_REQUIRED_FIELDS_FRAGMENT from '../fragments/incomplete-profile-required-fields';
import POLICYHOLDER_ACCOUNT_POLICY_FRAGMENT from '../fragments/policyholder-account-policy';

const EMBEDDED_APP_QUERY = gql`
query EmbeddedApp($externalId:ID!, $billingCycle:BillingCycle!) {
  account(externalId:$externalId){
    id
    __typename
    ... on ConsentedAccount {
      profile {
        __typename
        completed
        id

        drivers {
          id
          firstName
          lastName
          ...CompletedProfileEditDriverForm
        }
        mailingAddress {
          id
          line1
          line2
          city
          state
          zip
        }
        vehicles {
          id
          make
          model
          year
          ...CompletedProfileEditVehicleForm
        }
        
        ... on IncompleteProfile {
          ...IncompleteProfileRequiredFields
        }
        
        ... on CompletedProfile {
          ...CompletedProfileSummary
          ...CompletedProfileAddDriverForm
          ...CompletedProfileAddVehicleForm
        }

        ... on RatedProfile {
          rate {
            __typename
            ... on BindableRate {
              quotes {
                id
                billingAmount(billingCycle:$billingCycle) {
                  cents
                  dollars
                }
                coverages {
                  declined
                  symbol
                }
                tier
              }
            }
            ... on StaleRate {
              quotes {
                id
                billingAmount(billingCycle:$billingCycle) {
                  cents
                  dollars
                }
                coverages {
                  declined
                  symbol
                }
                tier
              }
            }
          }
        }
      }
    }
    ... on PolicyholderAccount {
      ...PolicyholderAccountPolicy
    }
  }
}
${COMPLETED_PROFILE_ADD_DRIVER_FRAGMENT}
${COMPLETED_PROFILE_ADD_VEHICLE_FRAGMENT}
${COMPLETED_PROFILE_EDIT_DRIVER_FRAGMENT}
${COMPLETED_PROFILE_EDIT_VEHICLE_FRAGMENT}
${COMPLETED_PROFILE_SUMMARY_FRAGMENT}
${INCOMPLETE_PROFILE_REQUIRED_FIELDS_FRAGMENT}
${POLICYHOLDER_ACCOUNT_POLICY_FRAGMENT}
`;

export default EMBEDDED_APP_QUERY;
