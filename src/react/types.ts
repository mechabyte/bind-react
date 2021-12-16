import type Client from '@embedded-bind/client';
import type { ReactNode } from 'react';

interface IEmbeddedClientProvider {
  client: Client;
  children: ReactNode;
}

type EmbeddedClientContextType = Client;

export type {
  EmbeddedClientContextType,
  IEmbeddedClientProvider,
}