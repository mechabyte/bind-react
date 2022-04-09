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

            disclaimers {
              __typename
              id
              name
              ... on GeneratedDisclaimer {
                url
              }
            }
          }
        }
      }
    }
  }
}
`;

export default QUOTE_CHECKOUT_QUERY;
