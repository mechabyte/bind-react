import type { EmbeddedBindContextType } from '@embedded-bind/react/types';
import { createContext, useContext } from 'react';

const EmbeddedBindContext = createContext<EmbeddedBindContextType | undefined>(undefined);
const EmbeddedBindConsumer = EmbeddedBindContext.Consumer;

function useEmbeddedBind() {
  const context = useContext(EmbeddedBindContext);
  
  if (context === undefined) { throw new Error('useEmbeddedBind() must be used within <EmbeddedBindProvider />'); }

  return context;
}

export {
  EmbeddedBindConsumer,
  EmbeddedBindContext,
  useEmbeddedBind,
}