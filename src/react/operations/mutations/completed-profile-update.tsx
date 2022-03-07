import { gql } from '@apollo/client';
import COMPLETED_PROFILE_UPDATE_FORM_FRAGMENT from '../fragments/completed-profile-update-form';

const COMPLETED_PROFILE_UPDATE_MUTATION = gql`
mutation CompletedProfileUpdate(
  $externalUserId:String!,
  $input:ProfileInput!,
  $attemptPrefill:Boolean!
) {
  performProfileOperations(input:{externalUserId:$externalUserId,operations:[{updateProfile:$input}],attemptPrefill:$attemptPrefill}) {
    errors
    embeddedAccount {
      profile {
        completed
        ... on CompletedProfile {
          ...CompletedProfileUpdateForm
        }
      }
    }
  }
}
${COMPLETED_PROFILE_UPDATE_FORM_FRAGMENT}
`;

export default COMPLETED_PROFILE_UPDATE_MUTATION;