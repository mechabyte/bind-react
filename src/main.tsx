/* eslint-disable no-underscore-dangle */
import { StrictMode } from "react";
import { render } from "react-dom";
import createClient from '@embedded-bind/client';
import { EmbeddedApp, EmbeddedClientProvider, DateInput, NumberInput, Select, TextInput } from '@embedded-bind/react';
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

render(
  <StrictMode>
    <EmbeddedClientProvider client={client}>
      <EmbeddedApp externalId="cedd77bc-fbe4-4484-a46b-8c7c5bd3dffb">
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
              <ul>
                {
                   data.embeddedAccount.profile.requiredFields?.map((requiredField) => {
                    console.log(requiredField?.__typename === "SelectFormInput" && requiredField.options)

                     return (
                        <li key={requiredField.name}>
                          {
                            requiredField.__typename === "DateFormInput" &&
                            <DateInput
                              disabled={requiredField.disabled}
                              maxDate={requiredField.maxDate}
                              minDate={requiredField.minDate}
                              name={requiredField.name}
                              required={requiredField.required}
                              label={requiredField.label}
                              selectedDate={requiredField.selectedDate}
                            />
                          }
                          {
                            requiredField.__typename === "NumberFormInput" &&
                            <NumberInput
                              disabled={requiredField.disabled || false}
                              max={requiredField.maxValue || undefined}
                              min={requiredField.minValue || undefined}
                              name={requiredField.name}
                              required={requiredField.required || false}
                              label={requiredField.label || undefined}
                              value={requiredField.numericValue || undefined}
                            />
                          }
                          {
                            requiredField.__typename === "SelectFormInput" &&
                            <Select
                              data={requiredField.options || []}
                              disabled={requiredField.disabled || false}
                              name={requiredField.name}
                              required={requiredField.required || false}
                              label={requiredField.label || undefined}
                              selectedOption={requiredField.selectedOption}
                            />
                          }
                          {
                            requiredField.__typename === "TextFormInput" &&
                            <TextInput
                              description={requiredField.description}
                              disabled={requiredField.disabled || false}
                              name={requiredField.name}
                              required={requiredField.required || false}
                              label={requiredField.label || undefined}
                              value={requiredField.value || undefined}
                            />
                          }
                        </li>
                     )
                    }
                  )
                }
              </ul>
            )
          }
          return <p>Something went wrong</p>
        }}
      </EmbeddedApp>
    </EmbeddedClientProvider>
  </StrictMode>,
  document.getElementById("root")
);
