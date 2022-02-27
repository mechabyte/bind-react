import { gql } from "@apollo/client";

export default gql`
  query EmbeddedApp($externalId:ID!) {
    embeddedAccount(externalId:$externalId){
      id
      profile {
        __typename
        completed

        drivers {
          id
          firstName
          lastName
        }
        mailingAddress {
          city
          state
          zip
        }
        vehicles {
          id
          make
          model
          year
        }
        
        ... on IncompleteProfile {
          requiredFields(excludeSubmitted: true) {
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
        
        ... on CompletedProfile {
          prefilled
          prefilling
          rated
          rating
        }
      }
    }
  }
`