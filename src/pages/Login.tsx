import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "../styles/login.css";
import Button from "@material-ui/core/Button";
// import { Link } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStore from "../store";
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

function Login() {
  const classes = useStyles();
  const loggedinUser = useStore((state) => state.loggedinUser);
  const setLoggedinUser = useStore((state) => state.setLoggedinUser);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  function onLogin(e: any) {
    e.preventDefault();

    const loginDetails = {
      username,
      password,
    };

    fetch("http://localhost:4000/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Failed to login");
        }
      })
      .then((user) => {
        setLoggedinUser(user.data);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="login-page-container">
      <div className="top-login-page">
        <h1 className="login-page-header">Sign in to your account</h1>
        <h2 className="login-page-h2">
          Sign in to continue your therapy journey.
        </h2>
      </div>
      <div className="form-wrapper">
        <form
          onSubmit={(e) => onLogin(e)}
          className="login"
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            id="userName"
            label="username"
            variant="outlined"
            placeholder="Username"
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            label="password"
            variant="outlined"
          />
          <button className="login-button">Log in</button>
          <h3 className="logo-page-h3">
            Don't have an account?{" "}
            <Link to="/signup" className="logo-page-sign-up">
              Sign up
            </Link>
          </h3>
        </form>
      </div>
    </div>
  );
}

export default Login;
