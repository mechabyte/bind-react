import Client from '@embedded-bind/client';
import type { IEmbeddedBindProvider } from '@embedded-bind/react/types';
import { useMemo, useRef } from 'react';
import { EmbeddedBindContext } from '@embedded-bind/react/embedded-bind-provider/context';

const getToken = () => localStorage.getItem('token');
const persistToken = (token: string) => localStorage.setItem('token', token);

function EmbeddedBindProvider({ apiKey, apiUrl, children }: IEmbeddedBindProvider) {
  const clientRef = useRef(new Client(apiKey, apiUrl, { getToken, persistToken }));
  const value = useMemo(() => ({ client: clientRef.current }), []);
  return (
    <EmbeddedBindContext.Provider value={value}>
      {children}
    </EmbeddedBindContext.Provider>
  )
};

export { useEmbeddedBind } from '@embedded-bind/react/embedded-bind-provider/context'

export default EmbeddedBindProvider;