import React, { useEffect, useState } from 'react'
import { Button } from '@mantine/core'
import dropin, { Dropin } from "braintree-web-drop-in";

export interface BraintreeClientProps {
  buttonText?: string;
  children: JSX.Element;
  clientPaymentAuthorizationToken: string;
  onPaymentCompleted: (paymentMethodNonce: string) => void;
}

export default function BraintreeClient ({ buttonText, children, clientPaymentAuthorizationToken, onPaymentCompleted }: BraintreeClientProps) {

  const [initialized, setInitialized] = useState(false);
  const [requestingPayment, setRequestingPayment] = useState(false);
  const [braintreeInstance, setBraintreeInstance] = useState<Dropin | undefined>(undefined);

  useEffect(() => {
    const initializeBraintree = () => dropin.create({
        // insert your tokenization key or client token here
        authorization: clientPaymentAuthorizationToken, 
        container: '#braintree-drop-in-div',
    }, (error, instance) => {
        if (error)
            console.error(error)
        else
            setBraintreeInstance(instance);
            setInitialized(true);
    });

    if (braintreeInstance && !initialized) {
        braintreeInstance
            .teardown()
            .then(() => {
                initializeBraintree();
            });
    } else {
        initializeBraintree();
    }
  }, [braintreeInstance, clientPaymentAuthorizationToken, initialized]);

  return (
      <div>
          {children}
          <div
              id="braintree-drop-in-div"
          />

          <Button
              className="braintreePayButton"
              disabled={!braintreeInstance}
              loading={requestingPayment}
              onClick={() => {
                  if (braintreeInstance) {
                      setRequestingPayment(true);
                      braintreeInstance.requestPaymentMethod(
                          (error, payload) => {
                              setRequestingPayment(false);
                              if (error) {
                                  console.error(error);
                              } else {
                                  onPaymentCompleted(payload.nonce);
                              }
                          });
                  }
              }}
          >
            {buttonText || "Pay"}
          </Button>
      </div>
  )
}