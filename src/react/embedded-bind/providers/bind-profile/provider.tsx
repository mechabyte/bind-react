import type { ReactNode } from 'react';
import { useBindProfileQuery } from '@embedded-bind/react/embedded-bind/hooks/use-query';
import { BindProfileContext, BindProfileContextType } from "@embedded-bind/react/embedded-bind/providers/bind-profile/context";

interface IBindProfileProvider {
  children: ReactNode;
  value: BindProfileContextType;
}

function BindProfileProvider({ children, value: overrideValue }: IBindProfileProvider) {
  const value = useBindProfileQuery();

  return (
    <BindProfileContext.Provider value={overrideValue ?? value}>
      {children}
    </BindProfileContext.Provider>
  )
};

export type { IBindProfileProvider };
export default BindProfileProvider;
