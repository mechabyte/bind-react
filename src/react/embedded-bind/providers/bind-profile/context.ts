import type { BindProfileType, ClientError } from '@embedded-bind/client/types'; 
import type { UseQueryResult } from 'react-query';
import type { UseBindProfileQueryOptions } from '@embedded-bind/react/types';
import { createContext, useContext } from 'react';

type BindProfileContextType = undefined | UseQueryResult<UseBindProfileQueryOptions, unknown>;

const BindProfileContext = createContext<BindProfileContextType>(undefined);

const BindProfileConsumer = BindProfileContext.Consumer;

function useBindProfile(): BindProfileContextType {
  const context = useContext(BindProfileContext);
  if (context === undefined) {
    throw new Error('`useBindProfile()` must be called within a BindProfileProvider');
  }
  return context;
};

export type { BindProfileContextType };
export {
  BindProfileConsumer,
  BindProfileContext,
  useBindProfile,
};