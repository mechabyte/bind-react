import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
} from "@apollo/client";

function EmbeddedBindProvider({ children, client }: { children: JSX.Element, client: ApolloClient<NormalizedCacheObject> }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

export default EmbeddedBindProvider;
