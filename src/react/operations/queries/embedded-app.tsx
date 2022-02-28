import { gql } from "@apollo/client";
import COMPLETED_PROFILE_SUMMARY_FRAGMENT from '../fragments/completed-profile-summary';
import INCOMPLETE_PROFILE_REQUIRED_FIELDS_FRAGMENT from '../fragments/incomplete-profile-required-fields';

const EMBEDDED_APP_QUERY = gql`
query EmbeddedApp($externalId:ID!) {
  embeddedAccount(externalId:$externalId){
    id
    profile {
      __typename
      completed

      drivers {
        id
        firstName
        lastName
      }
      mailingAddress {
        city
        state
        zip
      }
      vehicles {
        id
        make
        model
        year
      }
      
      ... on IncompleteProfile {
        ...IncompleteProfileRequiredFields
      }
      
      ... on CompletedProfile {
        ...CompletedProfileSummary
        prefilled
        prefilling
        rated
        rating
      }
    }
  }
}
${COMPLETED_PROFILE_SUMMARY_FRAGMENT}
${INCOMPLETE_PROFILE_REQUIRED_FIELDS_FRAGMENT}
`;

export default EMBEDDED_APP_QUERY;
