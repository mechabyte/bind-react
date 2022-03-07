/* eslint-disable no-underscore-dangle */
import { StrictMode, useCallback, useState } from "react";
import { render } from "react-dom";
import { TextInput as BaseTextInput, Button, Modal, ActionIcon } from "@mantine/core"
import createClient from '@embedded-bind/client';
import { EmbeddedApp, EmbeddedClientProvider, IncompleteProfileForm, CompletedProfileUpdateForm, CompletedProfileAddDriverForm, CompletedProfileAddVehicleForm, FormFields } from '@embedded-bind/react';
import { InMemoryCache } from "@apollo/client";
import { AdditionalVehicleInput, DriverInput, FormInputTypesFragment, VehicleInput } from "./react/graphql/generated";

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

function TextInputWrapper({ children }: { children: ({ externalId }: {
  externalId: string,
  displayAddDriver: boolean,
  displayAddVehicle: boolean,
  displayUpdateProfile: boolean,
  setDisplayAddDriver: (isAddingDriver: boolean) => void
  setDisplayAddVehicle: (isAddingVehicle: boolean) => void,
  setDisplayUpdateProfile: (isUpdatingProfile: boolean) => void,
}) => JSX.Element}) {
  const [value, setValue] = useState('cedd77bc-fbe4-4484-a46b-8c7c5bd3dffb');

  const [addingDriver, setAddingDriver] = useState(false);
  const [addingVehicle, setAddingVehicle] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const handleChange = useCallback((event) => setValue(event.target.value), [setValue])


  return (
    <>
      <BaseTextInput label="Query embedded API for a specified user" value={value} onChange={handleChange} />
      {
        children(
          {
            displayAddDriver: addingDriver,
            setDisplayAddDriver: setAddingDriver,
            externalId: value,
            displayAddVehicle: addingVehicle,
            setDisplayAddVehicle: setAddingVehicle,
            displayUpdateProfile: updatingProfile,
            setDisplayUpdateProfile: setUpdatingProfile
          }
        )
      }
    </>
  )
}

render(
  <StrictMode>
    <EmbeddedClientProvider client={client}>
      <TextInputWrapper>
        {({ externalId, displayAddDriver, displayAddVehicle, displayUpdateProfile, setDisplayUpdateProfile, setDisplayAddDriver, setDisplayAddVehicle }) => (
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
                      <h3>Completed profile!</h3>
                      <Button size="xs" onClick={() => setDisplayUpdateProfile(true)}>
                        EDIT
                      </Button>
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
                        <Button size="xs" onClick={() => setDisplayAddDriver(true)}>
                          ADD
                        </Button>
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
                        <Button size="xs" onClick={() => setDisplayAddVehicle(true)}>
                          ADD
                        </Button>
                      </p>
                      <CompletedProfileUpdateForm attemptPrefill={false} externalUserId={externalId}>
                        {({ inputs, title, updateProfile, updatingProfile }) => {
                          const onSubmitForm = (input: ProfileInput) => {
                            updateProfile(input).then(() => setDisplayUpdateProfile(false))
                          }
                          return (
                            <Modal
                              opened={displayUpdateProfile}
                              onClose={() => setDisplayUpdateProfile(false)}
                              title={title}
                            >
                            <FormFields inputs={inputs as FormInputTypesFragment[]} onSubmit={onSubmitForm} submitting={updatingProfile} />
                            </Modal>
                          )}}
                      </CompletedProfileUpdateForm>
                      
                      <CompletedProfileAddDriverForm externalUserId={externalId}>
                        {({ inputs, title, addDriver, addingDriver }) => {
                          const onSubmitForm = (input: DriverInput) => {
                            addDriver(input).then(() => setDisplayAddDriver(false))
                          }
                          return (
                            <Modal
                              opened={displayAddDriver}
                              onClose={() => setDisplayAddDriver(false)}
                              title={title}
                            >
                              <FormFields inputs={inputs as FormInputTypesFragment[]} onSubmit={onSubmitForm} submitting={addingDriver} />
                            </Modal>
                          )
                        }}
                      </CompletedProfileAddDriverForm>
                      <CompletedProfileAddVehicleForm externalUserId={externalId}>
                      {({ inputs, title, addVehicle, addingVehicle }) => {
                        const onSubmitForm = (input: VehicleInput) => {
                          addVehicle(input).then(() => setDisplayAddVehicle(false))
                        }
                        return (
                          <Modal
                            opened={displayAddVehicle}
                            onClose={() => setDisplayAddVehicle(false)}
                            title={title}
                          >
                            <FormFields inputs={inputs as FormInputTypesFragment[]} onSubmit={onSubmitForm} submitting={addingVehicle} />
                          </Modal>
                        )
                      }}
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
