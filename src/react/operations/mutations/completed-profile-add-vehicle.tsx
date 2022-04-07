import { gql } from '@apollo/client';
import COMPLETED_PROFILE_ADD_VEHICLE_FORM_FRAGMENT from '../fragments/completed-profile-add-vehicle-form';

const COMPLETED_PROFILE_ADD_VEHICLE_MUTATION = gql`
mutation CompletedProfileAddVehicle(
  $externalId:String!,
  $input:VehicleInput!,
  $attemptQuote:Boolean!
) {
  performProfileOperations(input:{externalId:$externalId,operations:[{addVehicle:$input}],attemptQuote:$attemptQuote}) {
    errors
    account {
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
}
${COMPLETED_PROFILE_ADD_VEHICLE_FORM_FRAGMENT}
`;

export default COMPLETED_PROFILE_ADD_VEHICLE_MUTATION;