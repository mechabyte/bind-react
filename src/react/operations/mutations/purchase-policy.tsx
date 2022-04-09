import { gql } from '@apollo/client';

const PURCHASE_POLICY_MUTATION = gql`
mutation PurchasePolicy(
  $input:PurchasePolicyInput!
) {
  purchasePolicy(input:$input) {
    errors
    purchased
    account {
      __typename
      id
    }
  }
}
`;

export default PURCHASE_POLICY_MUTATION;