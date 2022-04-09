import { gql } from '@apollo/client';

const PURCHASE_POLICY_MUTATION = gql`
mutation PurchasePolicy(
  $input:PurchasePolicyInput!
) {
  purchasePolicy(input:$input) {
    errors
    purchased
    account {
      id
      __typename
    }
  }
}
`;

export default PURCHASE_POLICY_MUTATION;