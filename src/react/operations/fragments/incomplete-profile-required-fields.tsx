import { gql } from '@apollo/client';

export default gql`
  fragment IncompleteProfileRequiredFields on IncompleteProfile {
    requiredFields {
      __typename
      name
      
      ... on CheckboxFormInput {
        checked
        disabled
        label
        required
      }
      
      ... on DateFormInput {
        disabled
        label
        maxDate
        minDate
        placeholder
        required
        selectedDate
      }
      
      ... on NumberFormInput {
        description
        disabled
        label
        maxValue
        minValue
        placeholder
        required
        numericValue: value
      }
      
      ... on SelectFormInput {
        disabled
        label
        options {
          label
          value
        }
        required
        selectedOption
      }
      ... on TextFormInput {
        description
        disabled
        label
        placeholder
        required
        value
      }
    }
  }
`;
