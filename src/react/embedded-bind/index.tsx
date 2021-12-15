import { useEffect } from 'react';
import { useEmbeddedBind } from '@embedded-bind/react/embedded-bind-provider'

export default function() {
  const { client } = useEmbeddedBind();
  useEffect(() => {
    console.log(client);
  }, [client]);

  return (
    <h3>Howdy!</h3>
  )
};