import React, { useCallback } from 'react'
import { useQuery, useMutation, ApolloError, ApolloQueryResult } from '@apollo/client';
import { QuoteCheckoutQuery, QuoteCheckoutQueryVariables } from '../../graphql/generated'
import QUOTE_CHECKOUT_QUERY from "../../operations/queries/quote-checkout";

interface AppQueryRenderProps {
  data: QuoteCheckoutQuery | undefined,
  error: ApolloError | undefined,
  loading: boolean,
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
  
  return children({
    data,
    error,
    loading,
    refetch,
  })
}