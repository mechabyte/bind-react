/* eslint-disable no-underscore-dangle */
import { StrictMode, useCallback, useState } from "react";
import { render } from "react-dom";
import { TextInput as BaseTextInput, Button } from "@mantine/core"
import createClient from '@embedded-bind/client';
import { EmbeddedApp, EmbeddedClientProvider, IncompleteProfileForm, CompletedProfileUpdateForm, CompletedProfileAddDriverForm, CompletedProfileAddVehicleForm, FormFields } from '@embedded-bind/react';
import { InMemoryCache } from "@apollo/client";
import { FormInputTypesFragment } from "./react/graphql/generated";

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
                        <h4>Drivers:</h4>
                        <ul>
                          {
                            data.embeddedAccount.profile.drivers.map((driver) => 
                              <li key={driver.id}>
                                {driver.firstName} {driver.lastName}
                              </li>
                            )
                          }
                        </ul>
                      </p>
                      <p>
                        <h4>Vehicles:</h4>
                        <ul>
                          {
                            data.embeddedAccount.profile.vehicles.map((vehicle) => 
                              <li key={vehicle.id}>
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </li>
                            )
                          }
                        </ul>
                      </p>
                      <CompletedProfileUpdateForm attemptPrefill={false} externalUserId={externalId}>
                        {({ inputs, title, updateProfile }) => (
                           <FormFields inputs={inputs as FormInputTypesFragment[]} onSubmit={updateProfile} />
                          )}
                      </CompletedProfileUpdateForm>
                      <CompletedProfileAddDriverForm externalUserId={externalId}>
                        {({ inputs, title, addDriver }) => (
                           <FormFields inputs={inputs as FormInputTypesFragment[]} onSubmit={addDriver} />
                          )}
                      </CompletedProfileAddDriverForm>
                      <CompletedProfileAddVehicleForm externalUserId={externalId}>
                      {({ inputs, title, addVehicle }) => (
                           <FormFields inputs={inputs as FormInputTypesFragment[]} onSubmit={addVehicle} />
                          )}
                      </CompletedProfileAddVehicleForm>
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
