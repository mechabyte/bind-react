import { gql } from "@apollo/client";
import COMPLETED_PROFILE_UPDATE_FORM_FRAGMENT from '../fragments/completed-profile-update-form';

const COMPLETED_PROFILE_UPDATE_QUERY = gql`
query GetCompletedProfileUpdate($externalId:ID!) {
  embeddedAccount(externalId:$externalId){
    id
    profile {
      id
      completed

      ... on CompletedProfile {
        ...CompletedProfileUpdateForm
      }
    }
  }
}
${COMPLETED_PROFILE_UPDATE_FORM_FRAGMENT}
`;

export default COMPLETED_PROFILE_UPDATE_QUERY;
