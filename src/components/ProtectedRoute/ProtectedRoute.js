import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

/** HOC to protect routes */
const ProtectedRoute = ({ loggedIn, children }) => {
  if (loggedIn) {
    return children;
  } else {
    return <Redirect to="/" />;
  }
};
export default ProtectedRoute;
