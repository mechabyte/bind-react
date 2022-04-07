/* eslint-disable no-underscore-dangle */
import { StrictMode, useCallback, useState } from "react";
import { render } from "react-dom";
import { TextInput as BaseTextInput, Button, Modal, Group, CloseButton, Text } from "@mantine/core"
import createClient from '@embedded-bind/client';
import { EmbeddedApp, EmbeddedClientProvider, IncompleteProfileForm, CompletedProfileUpdateForm, CompletedProfileEditDriverForm, CompletedProfileEditVehicleForm, CompletedProfileAddDriverForm, CompletedProfileAddVehicleForm, CompletedProfileUpdateMailingAddressForm, FormFields } from '@embedded-bind/react';
import { InMemoryCache } from "@apollo/client";
import { AdditionalVehicleInput, DriverInput, ProfileInput, FormInputTypesFragment, VehicleInput, CompletedProfileEditDriverFormFragment, CompletedProfileEditVehicleFormFragment, MailingAddressInput } from "./react/graphql/generated";

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
  displayEditDriver: CompletedProfileEditDriverFormFragment | undefined,
  displayEditVehicle: CompletedProfileEditVehicleFormFragment | undefined,
  displayUpdateMailingAddress: boolean,
  displayUpdateProfile: boolean,
  setDisplayAddDriver: (isAddingDriver: boolean) => void
  setDisplayAddVehicle: (isAddingVehicle: boolean) => void,
  setDisplayEditDriver: (driver: CompletedProfileEditDriverFormFragment | undefined) => void
  setDisplayEditVehicle: (vehicle: CompletedProfileEditVehicleFormFragment | undefined) => void,
  setDisplayUpdateMailingAddress: (isUpdatingMailingAddress: boolean) => void,
  setDisplayUpdateProfile: (isUpdatingProfile: boolean) => void,
}) => JSX.Element}) {
  const [value, setValue] = useState('cedd77bc-fbe4-4484-a46b-8c7c5bd3dffb');

  const [addingDriver, setAddingDriver] = useState(false);
  const [addingVehicle, setAddingVehicle] = useState(false);
  const [editingDriver, setEditingDriver] = useState<CompletedProfileEditDriverFormFragment | undefined>(undefined);
  const [editingVehicle, setEditingVehicle] = useState<CompletedProfileEditVehicleFormFragment | undefined>(undefined);
  const [updatingMailingAddress, setUpdatingMailingAddress] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const handleChange = useCallback((event) => setValue(event.target.value), [setValue])


  return (
    <>
      <BaseTextInput label="Query embedded API for a specified user" value={value} onChange={handleChange} />
      {
        children(
          {
            displayAddDriver: addingDriver,
            displayEditDriver: editingDriver,
            displayEditVehicle: editingVehicle,
            setDisplayAddDriver: setAddingDriver,
            externalId: value,
            displayAddVehicle: addingVehicle,
            setDisplayAddVehicle: setAddingVehicle,
            setDisplayEditDriver: setEditingDriver,
            setDisplayEditVehicle: setEditingVehicle,
            displayUpdateProfile: updatingProfile,
            displayUpdateMailingAddress: updatingMailingAddress,
            setDisplayUpdateMailingAddress: setUpdatingMailingAddress,
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
        {({ externalId, displayAddDriver, displayAddVehicle, displayEditDriver, displayEditVehicle, displayUpdateMailingAddress, displayUpdateProfile, setDisplayEditDriver, setDisplayEditVehicle, setDisplayUpdateMailingAddress, setDisplayUpdateProfile, setDisplayAddDriver, setDisplayAddVehicle }) => (
            <EmbeddedApp externalId={externalId}>
              {({ data, loading, error, removeDriver, removeVehicle }) => {
                console.log(data);
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
                if (data?.account?.__typename === 'UnconsentedAccount') {
                  return (<h3>No consent</h3>)
                }
                if (data?.account?.__typename === 'ConsentedAccount') {
                  if (data?.account?.profile?.__typename === 'IncompleteProfile') {
                    return (
                      <IncompleteProfileForm externalId={externalId} incompleteProfile={data.account.profile} />
                    )
                  }
                  if (data?.account?.profile?.__typename === 'CompletedProfile') {
                    return (
                      <>
                        <p>
                        <Button size="xs" onClick={() => setDisplayUpdateProfile(true)}>
                          EDIT PROFILE
                        </Button>
                        </p>
                        <div>
                          <h4>Address:</h4>
                          <Text>{data.account.profile.mailingAddress?.line1}</Text>
                          <Text>{data.account.profile.mailingAddress?.line2}</Text>
                          <Text>{`${data.account.profile.mailingAddress?.city}, ${data.account.profile.mailingAddress?.state} ${data.account.profile.mailingAddress?.zip}`}</Text>
                          <Button size="xs" onClick={() => setDisplayUpdateMailingAddress(true)}>
                            UPDATE
                          </Button>
                        </div>
                        <div>
                          <h4>Drivers:</h4>
                            {
                              data.account.profile.drivers.map((driver) => 
                              <Group position="left" key={driver.id}>
                                <Text onClick={() => setDisplayEditDriver(driver)}>{driver.firstName} {driver.lastName}</Text>
                                <CloseButton title="Remove driver" size="xl" iconSize={20} onClick={() => removeDriver({ driverId: driver.id, externalId, attemptQuote: true })} />
                              </Group>
                              )
                            }
                           <Button size="xs" onClick={() => setDisplayAddDriver(true)}>
                            ADD
                          </Button>
                        </div>
                        <div>
                          <h4>Vehicles:</h4>
                            {
                              data.account.profile.vehicles.map((vehicle) => 
                              <Group position="left" key={vehicle.id}>
                                <Text onClick={() => setDisplayEditVehicle(vehicle)}>{vehicle.year} {vehicle.make} {vehicle.model}</Text>
                                <CloseButton title="Remove vehicle" size="xl" iconSize={20} onClick={() => removeVehicle({ additionalVehicleId: vehicle.id, externalId, attemptQuote: true })} />
                              </Group>
                              )
                            }
                          <Button size="xs" onClick={() => setDisplayAddVehicle(true)}>
                            ADD
                          </Button>
                        </div>
                        <CompletedProfileUpdateForm attemptQuote externalId={externalId}>
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
                        <CompletedProfileUpdateMailingAddressForm attemptQuote externalId={externalId}>
                          {({ inputs, title, updateMailingAddress, updatingMailingAddress }) => {
                            const onSubmitForm = (input: MailingAddressInput) => {
                              updateMailingAddress(input).then(() => setDisplayUpdateMailingAddress(false))
                            }
                            return (
                              <Modal
                                opened={displayUpdateMailingAddress}
                                onClose={() => setDisplayUpdateMailingAddress(false)}
                                title={title}
                              >
                              <FormFields inputs={inputs as FormInputTypesFragment[]} onSubmit={onSubmitForm} submitting={updatingMailingAddress} />
                              </Modal>
                            )}}
                        </CompletedProfileUpdateMailingAddressForm>
                        {
                          displayEditDriver && <CompletedProfileEditDriverForm externalId={externalId} driver={displayEditDriver}>
                            {({ inputs, title, editDriver, editingDriver }) => {
                            const onSubmitForm = (input: DriverInput) => {
                              editDriver(input).then(() => setDisplayEditDriver(undefined))
                            }
                            return (
                              <Modal
                                opened={displayEditDriver !== undefined}
                                onClose={() => setDisplayEditDriver(undefined)}
                                title={title}
                              >
                                <FormFields inputs={inputs as FormInputTypesFragment[]} onSubmit={onSubmitForm} submitting={editingDriver} />
                              </Modal>
                            )
                          }}
                          </CompletedProfileEditDriverForm>
                        }
                        {
                          displayEditVehicle && <CompletedProfileEditVehicleForm externalId={externalId} vehicle={displayEditVehicle}>
                            {({ inputs, title, editVehicle, editingVehicle }) => {
                            const onSubmitForm = (input: AdditionalVehicleInput) => {
                              editVehicle(input).then(() => setDisplayEditVehicle(undefined))
                            }
                            return (
                              <Modal
                                opened={displayEditVehicle !== undefined}
                                onClose={() => setDisplayEditVehicle(undefined)}
                                title={title}
                              >
                                <FormFields inputs={inputs as FormInputTypesFragment[]} onSubmit={onSubmitForm} submitting={editingVehicle} />
                              </Modal>
                            )
                          }}
                          </CompletedProfileEditVehicleForm>
                        }
                        
                        <CompletedProfileAddDriverForm externalId={externalId} profile={data.account.profile} attemptQuote>
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
                        <CompletedProfileAddVehicleForm externalId={externalId} profile={data.account.profile} attemptQuote>
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
