import { gql } from "@apollo/client";
import COMPLETED_PROFILE_UPDATE_MAILING_ADDRESS_FORM_FRAGMENT from '../fragments/completed-profile-update-mailing-address-form';

const COMPLETED_PROFILE_UPDATE_MAILING_ADDRESS_QUERY = gql`
query GetCompletedProfileUpdateMailingAddress($externalId:ID!) {
  account(externalId:$externalId){
    id
    ... on ConsentedAccount {
      profile {
        id
        completed

        ... on CompletedProfile {
          mailingAddress {
            id
            ...CompletedProfileUpdateMailingAddressForm
          }
        }
      }
    }
  }
}
${COMPLETED_PROFILE_UPDATE_MAILING_ADDRESS_FORM_FRAGMENT}
`;

export default COMPLETED_PROFILE_UPDATE_MAILING_ADDRESS_QUERY;
