import { Route, Routes, RoutesProps, useNavigate } from 'react-router';

interface PublicRoutesProps extends RoutesProps {
  setToken: (token: string) => void;
}

const PATHS = {
  MISSING_ACTION: 'missing',
  VALIDATE_AUTH: '/',
};

function PublicRoutes({ location, setToken }: PublicRoutesProps) {
  const navigate = useNavigate();
  return (
    <Routes location={location}>
      <Route path={PATHS.VALIDATE_AUTH} element={
        <div>
          <h1>Validatin....</h1>
          <p>Definitely valid!</p>
          <button type="submit" onClick={() => setToken('hello')}>
            Set token
          </button>
        </div>
      } />
      <Route path={PATHS.MISSING_ACTION} element={
        <div>
          <h1>Uh oh!</h1>
          <p>You definitely need to be logged in for this</p>
          <button type="submit" onClick={() => navigate(PATHS.VALIDATE_AUTH)}>
            Login
          </button>
        </div>
      } />
    </Routes>
  )
};

export type { PublicRoutesProps };
export default PublicRoutes;