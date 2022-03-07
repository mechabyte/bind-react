import React, { useCallback } from 'react'
import { useQuery, useMutation, ApolloError, ApolloQueryResult, FetchResult } from '@apollo/client';
import { EmbeddedAppQuery, EmbeddedAppQueryVariables, CompletedProfileRemoveDriverMutation, CompletedProfileRemoveDriverMutationVariables, CompletedProfileRemoveVehicleMutation, CompletedProfileRemoveVehicleMutationVariables } from '../../graphql/generated'
import EMBEDDED_APP_QUERY from "../../operations/queries/embedded-app";
import COMPLETED_PROFILE_REMOVE_DRIVER_MUTATION from "../../operations/mutations/completed-profile-remove-driver"
import COMPLETED_PROFILE_REMOVE_VEHICLE_MUTATION from "../../operations/mutations/completed-profile-remove-vehicle"

interface AppQueryRenderProps {
  data: EmbeddedAppQuery | undefined,
  error: ApolloError | undefined,
  loading: boolean,
  refetch: (variables?: Partial<EmbeddedAppQueryVariables> | undefined) => Promise<ApolloQueryResult<EmbeddedAppQuery>>, 
  removeVehicle: (input: CompletedProfileRemoveVehicleMutationVariables) => Promise<FetchResult<CompletedProfileRemoveVehicleMutation>>,
  removeDriver: (input: CompletedProfileRemoveDriverMutationVariables) => Promise<FetchResult<CompletedProfileRemoveDriverMutation>>,
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

  const [removeDriverMutation, { loading: removingDriver }] = useMutation<CompletedProfileRemoveDriverMutation, CompletedProfileRemoveDriverMutationVariables>(COMPLETED_PROFILE_REMOVE_DRIVER_MUTATION);

  const removeDriver = useCallback((input: CompletedProfileRemoveDriverMutationVariables) => removeDriverMutation({ variables: input }), [removeDriverMutation]);

  const [removeVehicleMutation, { loading: removingVehicle }] = useMutation<CompletedProfileRemoveVehicleMutation, CompletedProfileRemoveVehicleMutationVariables>(COMPLETED_PROFILE_REMOVE_VEHICLE_MUTATION);

  const removeVehicle = useCallback((input: CompletedProfileRemoveVehicleMutationVariables) => removeVehicleMutation({ variables: input }), [removeVehicleMutation]);
  
  return children({
    data,
    error,
    loading,
    refetch,
    removeDriver,
    removeVehicle,
  })
}