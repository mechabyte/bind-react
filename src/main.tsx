/* eslint-disable no-underscore-dangle */
import { StrictMode, useCallback, useState } from "react";
import { render } from "react-dom";
import { TextInput as BaseTextInput } from "@mantine/core"
import createClient from '@embedded-bind/client';
import { EmbeddedApp, EmbeddedClientProvider, IncompleteProfileForm } from '@embedded-bind/react';
import { InMemoryCache } from "@apollo/client";

const client = createClient({
  headers: {
    'auth_token': 'j7Ae6862dxYw8ngyges7-g',
  },
  uri: 'http://localhost:3000/bind_api/web/graphql',
  cache: new InMemoryCache()
})

export interface IHelloWorld {
  helloworld: string;
}

function TextInputWrapper({ children }: { children: (value: string) => JSX.Element }) {
  const [value, setValue] = useState('cedd77bc-fbe4-4484-a46b-8c7c5bd3dffb');
  const handleChange = useCallback((event) => setValue(event.target.value), [setValue])
  return (
    <>
      <BaseTextInput label="Query embedded API for a specified user" value={value} onChange={handleChange} />
      {children(value)}
    </>
  )
}

render(
  <StrictMode>
    <EmbeddedClientProvider client={client}>
      <TextInputWrapper>
        {(externalId: string) => (
            <EmbeddedApp externalId={externalId}>
              {({ data, loading, error }) => {
                if (error) {
                  return (
                    <h2>{error.message}</h2>
                  )
                }
                if (loading) {
                  return (
                    <h2>Loading...</h2>
                  )
                }
                if (data?.embeddedAccount?.profile?.__typename === 'IncompleteProfile') {
                  return (
                    <IncompleteProfileForm externalUserId={externalId} incompleteProfile={data.embeddedAccount.profile} />
                  )
                }
                if (data?.embeddedAccount?.profile?.__typename === 'CompletedProfile') {
                  return (
                    <>
                      <h1>Completed profile!</h1>
                      <p>
                        {JSON.stringify(data.embeddedAccount.profile)}
                      </p>
                    </>
                  )
                }
                return <p>Something went wrong</p>
              }}
            </EmbeddedApp>
          )}
      </TextInputWrapper>
    </EmbeddedClientProvider>
  </StrictMode>,
  document.getElementById("root")
);
