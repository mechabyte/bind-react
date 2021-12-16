import { StrictMode } from "react";
import { render } from "react-dom";
import EmbeddedClient from '@embedded-bind/client';
import { EmbeddedBind, EmbeddedClientProvider } from '@embedded-bind/react';

const client = new EmbeddedClient('hello', 'http://localhost:3000');

export interface IHelloWorld {
  helloworld: string;
}

render(
  <StrictMode>
    <EmbeddedClientProvider client={client}>
      <EmbeddedBind />
    </EmbeddedClientProvider>
  </StrictMode>,
  document.getElementById("root")
);
