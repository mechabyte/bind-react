import { gql } from '@apollo/client';
import COMPLETED_PROFILE_EDIT_VEHICLE_FORM_FRAGMENT from '../fragments/completed-profile-edit-vehicle-form';

const COMPLETED_PROFILE_EDIT_VEHICLE_MUTATION = gql`
mutation CompletedProfileEditVehicle(
  $externalId:String!,
  $vehicleId: ID!,
  $input:VehicleInput!,
  $attemptQuote:Boolean!
) {
  performProfileOperations(input:{externalId:$externalId,operations:[{editAdditionalVehicle:{additionalVehicleId:$vehicleId,updates:$input}}],attemptQuote:$attemptQuote}) {
    errors
    account {
      ... on ConsentedAccount {
        profile {
          id
          completed

          ... on CompletedProfile {
            vehicles {
              id
              year
              make
              model
              ...CompletedProfileEditVehicleForm
            }
          }
        }
      }
    }
  }
}
${COMPLETED_PROFILE_EDIT_VEHICLE_FORM_FRAGMENT}
`;

export default COMPLETED_PROFILE_EDIT_VEHICLE_MUTATION;