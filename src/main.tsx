import { StrictMode } from "react";
import { render } from "react-dom";
import { EmbeddedBind, EmbeddedBindProvider } from '@embedded-bind/react';

export interface IHelloWorld {
  helloworld: string;
}

render(
  <StrictMode>
    <EmbeddedBindProvider apiKey="1337" apiUrl="https://localhost:3000">
      <EmbeddedBind />
    </EmbeddedBindProvider>
  </StrictMode>,
  document.getElementById("root")
);
