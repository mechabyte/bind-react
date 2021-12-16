import type { EmbeddedClientContextType } from '@embedded-bind/react/types';
import { createContext, useContext } from 'react';

const EmbeddedClientContext = createContext<EmbeddedClientContextType | undefined>(undefined);
const EmbeddedClientConsumer = EmbeddedClientContext.Consumer;

function useEmbeddedClient() {
  const context = useContext(EmbeddedClientContext);
  
  if (context === undefined) { throw new Error('useEmbeddedBind() must be used within <EmbeddedBindProvider />'); }

  return context;
}

export {
  EmbeddedClientConsumer,
  EmbeddedClientContext,
  useEmbeddedClient,
}