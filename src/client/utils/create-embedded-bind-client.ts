import {
  ApolloClient,
  ApolloClientOptions,
  NormalizedCacheObject
} from '@apollo/client';

function createEmbeddedBindClient<T extends NormalizedCacheObject>({
  uri,
  ...restConfig
}: ApolloClientOptions<T>) {
  const client = new ApolloClient({
    uri,
    ...restConfig
  });
  
  return client;
}

export default createEmbeddedBindClient;
