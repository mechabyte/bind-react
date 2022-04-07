import { gql } from '@apollo/client';
import COMPLETED_PROFILE_UPDATE_MAILING_ADDRESS_FORM_FRAGMENT from '../fragments/completed-profile-update-mailing-address-form';

const COMPLETED_PROFILE_UPDATE_MAILING_ADDRESS_MUTATION = gql`
mutation CompletedProfileUpdateMailingAddress(
  $externalId:String!,
  $input:MailingAddressInput!,
  $attemptQuote:Boolean!
) {
  performProfileOperations(input:{externalId:$externalId,operations:[{updateMailingAddress:$input}],attemptQuote:$attemptQuote}) {
    errors
    account {
      ... on ConsentedAccount {
        profile {
          id
          completed
          ... on CompletedProfile {
            mailingAddress {
              id
              line1
              line2
              city
              state
              zip
              ...CompletedProfileUpdateMailingAddressForm
            }
          }
        }
      }
    }
  }
}
${COMPLETED_PROFILE_UPDATE_MAILING_ADDRESS_FORM_FRAGMENT}
`;

export default COMPLETED_PROFILE_UPDATE_MAILING_ADDRESS_MUTATION;