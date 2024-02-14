import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile.tsx";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardAction";
import Experience from "./Experience.tsx";
import Education from "./Education.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks.ts";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const profileState = useAppSelector((state) => state.profile);
  const { profile, loading } = profileState;
  const { user } = auth;

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
