import { useState } from "react";
import Router from "@embedded-bind/react/embedded-bind/router";

export default function() {
  const [token, setToken] = useState<string | null>(null);
  return (
    <Router token={token} setToken={setToken} />
  )
};