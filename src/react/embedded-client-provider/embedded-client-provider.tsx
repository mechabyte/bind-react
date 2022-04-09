import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
} from "@apollo/client";
import {
  MantineProvider
} from "@mantine/core";

function EmbeddedBindProvider({ children, client }: { children: JSX.Element, client: ApolloClient<NormalizedCacheObject> }) {
  return (
    <ApolloProvider client={client}>
      <MantineProvider>
        {children}
      </MantineProvider>
    </ApolloProvider>
  );
}

export default EmbeddedBindProvider;
