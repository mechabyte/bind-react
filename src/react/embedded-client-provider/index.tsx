import type { IEmbeddedClientProvider } from '@embedded-bind/react/types';
import { EmbeddedClientContext } from '@embedded-bind/react/embedded-client-provider/context';
import { QueryClient as ReactQueryClient, QueryClientProvider as ReactQueryClientProvider } from 'react-query';
import { useEffect, useMemo, useRef, useState } from 'react';

function EmbeddedClientProvider({ client, children }: IEmbeddedClientProvider) {
  const embeddedClientRef = useRef(client);

  const reactQueryClientRef = useRef(
    new ReactQueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnWindowFocus: false,
        }
      }
    })
  );

  const value = useMemo(() => embeddedClientRef.current, [embeddedClientRef]);

  const [repos, setRepos] = useState<{ id: string, name: string }[]>([]);

  useEffect(() => {
    /**
    embeddedClientRef.current.createPrefillRequest({ data: {
      firstName: 'Matt',
      lastName: 'Smith',
      dob: '1993-11-22',
      address1: '121 W Chapman Rd',
      city: 'Oviedo',
      state: 'FL',
      zip: 32765,
      licenseNumber: '1337-h4x-br0',
      licenseState: 'FL'
    }})
    */
   embeddedClientRef.current.authorize({ auth: 'PNIVb78axcOd_FezZCUU_A' })
    embeddedClientRef.current.client.get<{ id: string, name: string }[]>('https://api.github.com/users/mechabyte/repos').then(({ data }) => setRepos(data))
  }, [embeddedClientRef])

  return (
    <EmbeddedClientContext.Provider value={value}>
      <ReactQueryClientProvider client={reactQueryClientRef.current}>
        {children}
        <ul>
          {repos.map((repo: { id: string, name: string }) => (
              <li key={repo?.id}>
                {repo.name}
              </li>
            ))}
        </ul>
      </ReactQueryClientProvider>
    </EmbeddedClientContext.Provider>
  )
};

export { useEmbeddedClient } from '@embedded-bind/react/embedded-client-provider/context'

export default EmbeddedClientProvider;