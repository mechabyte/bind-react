import { gql } from '@apollo/client';

const COMPLETED_PROFILE_REMOVE_VEHICLE_MUTATION = gql`
mutation CompletedProfileRemoveVehicle(
  $externalId:String!,
  $additionalVehicleId:ID!,
  $attemptQuote:Boolean!
) {
  performProfileOperations(input:{externalId:$externalId,operations:[{removeAdditionalVehicle:{vehicleId:$additionalVehicleId}}],attemptQuote:$attemptQuote}) {
    errors
    account {
      ... on ConsentedAccount {
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
}
`;

export default COMPLETED_PROFILE_REMOVE_VEHICLE_MUTATION;