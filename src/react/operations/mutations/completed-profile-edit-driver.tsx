import { gql } from '@apollo/client';
import COMPLETED_PROFILE_EDIT_DRIVER_FORM_FRAGMENT from '../fragments/completed-profile-edit-driver-form';

const COMPLETED_PROFILE_EDIT_DRIVER_MUTATION = gql`
mutation CompletedProfileEditDriver(
  $externalId:String!,
  $driverId: ID!,
  $input:DriverInput!,
  $attemptQuote:Boolean!
) {
  performProfileOperations(input:{externalId:$externalId,operations:[{editDriver:{driverId:$driverId,updates:$input}}],attemptQuote:$attemptQuote}) {
    errors
    account {
      ... on ConsentedAccount {
        profile {
          id
          completed
          ... on CompletedProfile {
            drivers {
              id
              firstName
              lastName
              ...CompletedProfileEditDriverForm
            }
          }
        }
      }
    }
  }
}
${COMPLETED_PROFILE_EDIT_DRIVER_FORM_FRAGMENT}
`;

export default COMPLETED_PROFILE_EDIT_DRIVER_MUTATION;