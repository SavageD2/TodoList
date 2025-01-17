import React from "react";
import { Navigate } from "react-router-dom";

type WithAuthProps = {
  isAuthenticated: boolean;
};

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithAuthProps> => {
  const ProtectedComponent: React.FC<P & WithAuthProps> = ({
    isAuthenticated,
    ...props
  }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return <WrappedComponent {...(props as P)} />;
  };

  return ProtectedComponent;
};

export default withAuth;
