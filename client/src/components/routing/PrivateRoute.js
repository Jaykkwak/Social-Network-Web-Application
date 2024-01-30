import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner";

const PrivateRoute = ({ component: Component }) => {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, loading } = auth;
  const navigate = useNavigate();

  if (loading) return <Spinner />;
  if (!loading && !isAuthenticated) navigate("/login");

  return <Component />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default PrivateRoute;
