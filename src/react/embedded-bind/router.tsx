import { BrowserRouter } from "react-router-dom";
import Routes from "@embedded-bind/react/embedded-bind/app-routes";

interface RouterProps {
  token: string | null;
  setToken: (token: string) => void;
}

function Router({ setToken, token }: RouterProps) {
  return (
    <BrowserRouter>
      <Routes setToken={setToken} token={token} />
    </BrowserRouter>
  )
}

export default Router;
