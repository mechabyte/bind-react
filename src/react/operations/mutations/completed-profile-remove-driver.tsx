import { gql } from '@apollo/client';

const COMPLETED_PROFILE_REMOVE_DRIVER_MUTATION = gql`
mutation CompletedProfileRemoveDriver(
  $externalUserId:String!,
  $driverId:ID!,
  $attemptPrefill:Boolean!
) {
  performProfileOperations(input:{externalUserId:$externalUserId,operations:[{removeDriver:{driverId:$driverId}}],attemptPrefill:$attemptPrefill}) {
    errors
    embeddedAccount {
      profile {
        id
        completed
        drivers {
          id
        }
      }
    }
  }
}
`;

export default COMPLETED_PROFILE_REMOVE_DRIVER_MUTATION;