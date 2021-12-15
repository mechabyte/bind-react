import type Client from '@embedded-bind/client';
import type { ReactNode } from 'react';

interface IEmbeddedBindProvider {
  apiKey: string;
  apiUrl: string;
  children: ReactNode;
}

type EmbeddedBindContextType = {
  client: Client;
};

export type {
  EmbeddedBindContextType,
  IEmbeddedBindProvider,
}