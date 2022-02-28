import { gql } from '@apollo/client';
import COMPLETED_PROFILE_SUMMARY_FRAGMENT from '../fragments/completed-profile-summary';
import INCOMPLETE_PROFILE_REQUIRED_FIELDS_FRAGMENT from '../fragments/incomplete-profile-required-fields';

const COMPLETE_PROFILE_MUTATION = gql`
mutation CompleteProfile(
  $externalUserId:String!,
  $input:CompleteProfileInputObject!
) {
  completeProfile(input:{externalUserId:$externalUserId,attributes:$input}) {
    embeddedAccount {
      profile {
        completed
        ... on IncompleteProfile {
          id
          ...IncompleteProfileRequiredFields
        }
        ... on CompletedProfile {
          ...CompletedProfileSummary
        }
      }
    }
  }
}
${COMPLETED_PROFILE_SUMMARY_FRAGMENT}
${INCOMPLETE_PROFILE_REQUIRED_FIELDS_FRAGMENT}
`;

export default COMPLETE_PROFILE_MUTATION;