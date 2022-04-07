import { gql } from '@apollo/client';

const COMPLETED_PROFILE_REMOVE_DRIVER_MUTATION = gql`
mutation CompletedProfileRemoveDriver(
  $externalId:String!,
  $driverId:ID!,
  $attemptQuote:Boolean!
) {
  performProfileOperations(input:{externalId:$externalId,operations:[{removeDriver:{driverId:$driverId}}],attemptQuote:$attemptQuote}) {
    errors
    account {
      ... on ConsentedAccount {
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
}
`;

export default COMPLETED_PROFILE_REMOVE_DRIVER_MUTATION;