import { gql } from '@apollo/client';
import COMPLETED_PROFILE_ADD_DRIVER_FORM_FRAGMENT from '../fragments/completed-profile-add-driver-form';

const COMPLETED_PROFILE_ADD_DRIVER_MUTATION = gql`
mutation CompletedProfileAddDriver(
  $externalUserId:String!,
  $input:DriverInput!,
  $attemptPrefill:Boolean!
) {
  performProfileOperations(input:{externalUserId:$externalUserId,operations:[{addDriver:$input}],attemptPrefill:$attemptPrefill}) {
    errors
    embeddedAccount {
      profile {
        completed
        ... on CompletedProfile {
          ...CompletedProfileAddDriverForm
        }
      }
    }
  }
}
${COMPLETED_PROFILE_ADD_DRIVER_FORM_FRAGMENT}
`;

export default COMPLETED_PROFILE_ADD_DRIVER_MUTATION;