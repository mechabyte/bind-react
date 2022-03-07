import { gql } from '@apollo/client';
import COMPLETED_PROFILE_EDIT_VEHICLE_FORM_FRAGMENT from '../fragments/completed-profile-edit-vehicle-form';

const COMPLETED_PROFILE_EDIT_VEHICLE_MUTATION = gql`
mutation CompletedProfileEditVehicle(
  $externalUserId:String!,
  $vehicleId: ID!,
  $input:AdditionalVehicleInput!,
  $attemptPrefill:Boolean!
) {
  performProfileOperations(input:{externalUserId:$externalUserId,operations:[{editAdditionalVehicle:{additionalVehicleId:$vehicleId,updates:$input}}],attemptPrefill:$attemptPrefill}) {
    errors
    embeddedAccount {
      profile {
        id
        completed
        vehicles {
          id
          ...CompletedProfileEditVehicleForm
        }
      }
    }
  }
}
${COMPLETED_PROFILE_EDIT_VEHICLE_FORM_FRAGMENT}
`;

export default COMPLETED_PROFILE_EDIT_VEHICLE_MUTATION;