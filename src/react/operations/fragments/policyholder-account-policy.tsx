import { gql } from '@apollo/client';

export default gql`
  fragment PolicyholderAccountPolicy on PolicyholderAccount {
    id
    profile {
      __typename
      id
    }
    policy {
      __typename
      effectiveDate
      expirationDate
      id
      number
      partnerBroadcasted

      primaryNamedInsured {
        id
        firstName
        lastName
      }
      namedInsureds {
        id
        firstName
        lastName
      }
    }
  }
`;
