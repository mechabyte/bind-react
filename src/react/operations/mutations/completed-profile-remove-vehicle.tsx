import { gql } from '@apollo/client';

const COMPLETED_PROFILE_REMOVE_VEHICLE_MUTATION = gql`
mutation CompletedProfileRemoveVehicle(
  $externalUserId:String!,
  $additionalVehicleId:ID!,
  $attemptPrefill:Boolean!
) {
  performProfileOperations(input:{externalUserId:$externalUserId,operations:[{removeAdditionalVehicle:{vehicleId:$additionalVehicleId}}],attemptPrefill:$attemptPrefill}) {
    errors
    embeddedAccount {
      profile {
        id
        completed
        vehicles {
          id
        }
      }
    }
  }
}
`;

export default COMPLETED_PROFILE_REMOVE_VEHICLE_MUTATION;