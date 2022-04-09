import { gql } from "@apollo/client";

const QUOTE_CHECKOUT_QUERY = gql`
query QuoteCheckout($externalId:ID!, $billingCycle:BillingCycle!, $selectedQuoteId: ID!) {
  account(externalId:$externalId){
    id
    __typename
    ... on ConsentedAccount {
      profile {
        ... on RatedProfile {
          quoteCheckout(billingCycle: $billingCycle, selectedQuoteId: $selectedQuoteId) {
            affirmationStatement {
              statement
              title
            }

            clientPaymentAuthorizationToken

            disclaimers {
              __typename
              id
              name
              ... on GeneratedDisclaimer {
                url
              }
            }

            policyStartDateInput {
              disabled
              label
              maxDate
              minDate
              placeholder
              required
              selectedDate
            }
          }
        }
      }
    }
  }
}
`;

export default QUOTE_CHECKOUT_QUERY;
