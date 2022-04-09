import React, { useCallback } from 'react'
import { useQuery, useMutation, ApolloError, ApolloQueryResult, FetchResult, MutationFunctionOptions } from '@apollo/client';
import { QuoteCheckoutQuery, QuoteCheckoutQueryVariables, PurchasePolicyMutation, PurchasePolicyMutationVariables, PurchasePolicyInput } from '../../graphql/generated'
import QUOTE_CHECKOUT_QUERY from "../../operations/queries/quote-checkout";
import PURCHASE_POLICY_MUTATION from "../../operations/mutations/purchase-policy";

interface AppQueryRenderProps {
  data: QuoteCheckoutQuery | undefined,
  error: ApolloError | undefined,
  loading: boolean,
  purchasePolicy: (options?: MutationFunctionOptions<PurchasePolicyMutation, PurchasePolicyMutationVariables>) => Promise<FetchResult<PurchasePolicyMutation>>,
  purchasingPolicy: boolean,
  refetch: (variables?: Partial<QuoteCheckoutQueryVariables> | undefined) => Promise<ApolloQueryResult<QuoteCheckoutQuery>>, 
}

interface QuoteCheckoutProps extends QuoteCheckoutQueryVariables {
  children: (props: AppQueryRenderProps) => JSX.Element;
}

export default function QuoteCheckout ({ children, ...variables }: QuoteCheckoutProps) {
  const { 
   loading, 
   data, 
   error,
   refetch,
  } = useQuery<QuoteCheckoutQuery>( // Use the type here for type safety
    QUOTE_CHECKOUT_QUERY,
    {
      variables,
    }
  );

  const [purchasePolicy, { loading: purchasingPolicy }] = useMutation<PurchasePolicyMutation, PurchasePolicyMutationVariables>(PURCHASE_POLICY_MUTATION);
  
  return children({
    data,
    error,
    loading,
    purchasePolicy,
    purchasingPolicy,
    refetch,
  })
}