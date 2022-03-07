import { gql } from '@apollo/client';
import COMPLETED_PROFILE_ADD_VEHICLE_FORM_FRAGMENT from '../fragments/completed-profile-add-vehicle-form';

const COMPLETED_PROFILE_ADD_VEHICLE_MUTATION = gql`
mutation CompletedProfileAddVehicle(
  $externalUserId:String!,
  $input:VehicleInput!,
  $attemptPrefill:Boolean!
) {
  performProfileOperations(input:{externalUserId:$externalUserId,operations:[{addVehicle:$input}],attemptPrefill:$attemptPrefill}) {
    errors
    embeddedAccount {
      profile {
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

export default COMPLETED_PROFILE_ADD_VEHICLE_MUTATION;