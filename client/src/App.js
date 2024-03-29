import "./App.css";
import { Fragment, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login.tsx";
import Register from "./components/auth/Register.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.ts";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth.tsx";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

const App = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
          <section className="container">
            <Alert />
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profiles" element={<Profiles />} />
              <Route path="profile/:id" element={<Profile />} />

              <Route
                path="dashboard"
                element={<PrivateRoute component={Dashboard} />}
              />
              <Route
                path="create-profile"
                element={<PrivateRoute component={CreateProfile} />}
              />
              <Route
                path="edit-profile"
                element={<PrivateRoute component={CreateProfile} />}
              />
              <Route
                path="add-experience"
                element={<PrivateRoute component={AddExperience} />}
              />
              <Route
                path="add-education"
                element={<PrivateRoute component={AddEducation} />}
              />
              <Route
                path="posts"
                element={<PrivateRoute component={Posts} />}
              />
              <Route
                path="posts/:id"
                element={<PrivateRoute component={Post} />}
              />
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
