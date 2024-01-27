import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
  const auth = useSelector((state) => state.auth);
  const { isAutenticated, loading } = auth;
  const navigate = useNavigate();

  if (!isAutenticated && !loading) {
    navigate("/login");
  }

  return <Component />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default PrivateRoute;
