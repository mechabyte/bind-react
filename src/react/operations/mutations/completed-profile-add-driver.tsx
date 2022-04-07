import { gql } from '@apollo/client';
import COMPLETED_PROFILE_ADD_DRIVER_FORM_FRAGMENT from '../fragments/completed-profile-add-driver-form';

const COMPLETED_PROFILE_ADD_DRIVER_MUTATION = gql`
mutation CompletedProfileAddDriver(
  $externalId:String!,
  $input:DriverInput!,
  $attemptQuote:Boolean!
) {
  performProfileOperations(input:{externalId:$externalId,operations:[{addDriver:$input}],attemptQuote:$attemptQuote}) {
    errors
    account {
      ... on ConsentedAccount {
        profile {
          id
          completed
          ... on CompletedProfile {
            ...CompletedProfileAddDriverForm
          }
        }
      }
    }
  }
}
${COMPLETED_PROFILE_ADD_DRIVER_FORM_FRAGMENT}
`;

export default COMPLETED_PROFILE_ADD_DRIVER_MUTATION;