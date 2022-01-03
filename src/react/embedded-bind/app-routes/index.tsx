import React, { useEffect } from 'react';
import {
  Location,
  Navigate,
  Route,
  Routes as BaseRoutes,
  useLocation,
  useNavigate,
} from 'react-router';
import PublicRoutes from '@embedded-bind/react/embedded-bind/app-routes/public-routes';
import Layout from './layout';

interface NavigationState {
  from: Location | undefined;
}

interface RoutesProps {
  location?: Location;
  setToken: (token: string) => void;
  token: null | string;
}

const PATHS = {
  PROTECTED: 'bind',
  PUBLIC: 'validate',
};

function Routes({ location: overrideLocation, setToken, token }: RoutesProps) {
  const location = useLocation();
  
  return (
    <BaseRoutes location={location}>
      <Route path="/" element={<Layout />}>
        <Route path={PATHS.PROTECTED} element={<>{'yip!'}{'woo!'}{token}</>} />
        <Route path={PATHS.PUBLIC} element={<PublicRoutes setToken={setToken} />} />
      </Route>
    </BaseRoutes>
  )
}

Routes.defaultProps = {
  location: undefined,
};

export type { NavigationState, RoutesProps };
export default Routes;
