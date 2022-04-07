import { gql } from '@apollo/client';
import COMPLETED_PROFILE_UPDATE_FORM_FRAGMENT from '../fragments/completed-profile-update-form';

const COMPLETED_PROFILE_UPDATE_MUTATION = gql`
mutation CompletedProfileUpdate(
  $externalId:String!,
  $input:ProfileInput!,
  $attemptQuote:Boolean!
) {
  performProfileOperations(input:{externalId:$externalId,operations:[{updateProfile:$input}],attemptQuote:$attemptQuote}) {
    errors
    account {
      ... on ConsentedAccount {
        profile {
          id
          completed
          ... on CompletedProfile {
            ...CompletedProfileUpdateForm
          }
        }
      }
    }
  }
}
${COMPLETED_PROFILE_UPDATE_FORM_FRAGMENT}
`;

export default COMPLETED_PROFILE_UPDATE_MUTATION;