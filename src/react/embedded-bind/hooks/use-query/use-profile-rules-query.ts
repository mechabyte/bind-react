import type { GetProfileRulesRequestType } from '@embedded-bind/client/types';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { queryKeys, UseProfileRulesQueryOptions } from '@embedded-bind/react/types';
import { useEmbeddedClient } from '@embedded-bind/react/embedded-client-provider';

function useProfileRulesQuery({ market }: GetProfileRulesRequestType) {
  const client = useEmbeddedClient();

  const options: UseProfileRulesQueryOptions = useMemo(() => ({
    queryKey: queryKeys.profileRules({ market }),
    queryFn: ({ signal }) => client.getProfileRules({
      params: {
        market,
      },
      signal,
    })
  }), [client, market]);

  return useQuery(options);
};

export default useProfileRulesQuery;
