import { gql } from "@apollo/client";
import COMPLETED_PROFILE_ADD_DRIVER_FORM_FRAGMENT from '../fragments/completed-profile-add-driver-form';

const COMPLETED_PROFILE_ADD_DRIVER_QUERY = gql`
query GetCompletedProfileAddDriver($externalId:ID!) {
  embeddedAccount(externalId:$externalId){
    id
    profile {
      completed

      ... on CompletedProfile {
        ...CompletedProfileAddDriverForm
      }
    }
  }
}
${COMPLETED_PROFILE_ADD_DRIVER_FORM_FRAGMENT}
`;

export default COMPLETED_PROFILE_ADD_DRIVER_QUERY;
