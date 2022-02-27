import React from 'react'
import { useQuery, ApolloError, ApolloQueryResult } from '@apollo/client';
import { EmbeddedAppQuery, EmbeddedAppQueryVariables } from '../../graphql/generated'
import EMBEDDED_APP_QUERY from "../../operations/queries/embedded-app";

interface AppQueryRenderProps {
  data: EmbeddedAppQuery | undefined,
  error: ApolloError | undefined,
  loading: boolean,
  refetch: (variables?: Partial<EmbeddedAppQueryVariables> | undefined) => Promise<ApolloQueryResult<EmbeddedAppQuery>>, 
}

interface AppProps extends EmbeddedAppQueryVariables {
  children: (props: AppQueryRenderProps) => JSX.Element;
}

export default function App ({ children, ...variables }: AppProps) {
  const { 
   loading, 
   data, 
   error,
   refetch,
  } = useQuery<EmbeddedAppQuery>( // Use the type here for type safety
    EMBEDDED_APP_QUERY,
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