import { gql } from '@apollo/client';
import FORM_INPUT_TYPES_FRAGMENT from './form-input-types'

export default gql`
  fragment CompletedProfileUpdateMailingAddressForm on MailingAddress {
    id

    form(operation:UPDATE_MAILING_ADDRESS) {
      title
      inputs {
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
          __typename
          description
          disabled
          label
          placeholder
          required
          value
        }
        ...FormInputTypes
      }
    }
  }
${FORM_INPUT_TYPES_FRAGMENT}
`;
