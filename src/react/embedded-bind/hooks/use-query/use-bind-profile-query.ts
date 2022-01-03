import type { UseBindProfileQueryOptions } from '@embedded-bind/react/types'; 
import { useQuery } from 'react-query';
import { queryKeys } from '@embedded-bind/react/types';
import { useEmbeddedClient } from '@embedded-bind/react/embedded-client-provider';

function useBindProfile() {
  const client = useEmbeddedClient();

  return useQuery<UseBindProfileQueryOptions>({
    queryKey: queryKeys.bindProfile(),
    queryFn: ({ signal }) => client.profile({ signal }),
  })
};

export default useBindProfile;
