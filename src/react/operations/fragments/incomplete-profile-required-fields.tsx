import { gql } from '@apollo/client';
import FORM_INPUT_TYPES_FRAGMENT from './form-input-types';

export default gql`
  fragment IncompleteProfileRequiredFields on IncompleteProfile {
    requiredFields {
      __typename
      name
      
      ...FormInputTypes
    }
  }
${FORM_INPUT_TYPES_FRAGMENT}
`;
