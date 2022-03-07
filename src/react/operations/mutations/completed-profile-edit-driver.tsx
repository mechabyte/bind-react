import { gql } from '@apollo/client';
import COMPLETED_PROFILE_EDIT_DRIVER_FORM_FRAGMENT from '../fragments/completed-profile-edit-driver-form';

const COMPLETED_PROFILE_EDIT_DRIVER_MUTATION = gql`
mutation CompletedProfileEditDriver(
  $externalUserId:String!,
  $driverId: ID!,
  $input:DriverInput!,
  $attemptPrefill:Boolean!
) {
  performProfileOperations(input:{externalUserId:$externalUserId,operations:[{editDriver:{driverId:$driverId,updates:$input}}],attemptPrefill:$attemptPrefill}) {
    errors
    embeddedAccount {
      profile {
        id
        completed
        ... on CompletedProfile {
          ...CompletedProfileAddVehicleForm
        }
      }
    }
  }
}
${COMPLETED_PROFILE_EDIT_DRIVER_FORM_FRAGMENT}
`;

export default COMPLETED_PROFILE_EDIT_DRIVER_MUTATION;