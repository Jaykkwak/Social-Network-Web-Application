import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getProfilesById } from "../../actions/profile";
import { Link, useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";

const Profile = () => {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profile);
  const { profile, loading } = profileState;
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProfilesById(id));
  }, [id]);

  return (
    <section className="container">
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
        </Fragment>
      )}
    </section>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default Profile;
