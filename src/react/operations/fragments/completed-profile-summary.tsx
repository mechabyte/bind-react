import { gql } from '@apollo/client';

export default gql`
  fragment CompletedProfileSummary on CompletedProfile {
    __typename
    id
  }
`;
