import { gql } from "@apollo/client";
import COMPLETED_PROFILE_ADD_VEHICLE_FORM_FRAGMENT from '../fragments/completed-profile-add-vehicle-form';

const COMPLETED_PROFILE_ADD_VEHICLE_QUERY = gql`
query GetCompletedProfileAddVehicle($externalId:ID!) {
  account(externalId:$externalId){
    id
    ... on ConsentedAccount {
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
${COMPLETED_PROFILE_ADD_VEHICLE_FORM_FRAGMENT}
`;

export default COMPLETED_PROFILE_ADD_VEHICLE_QUERY;
