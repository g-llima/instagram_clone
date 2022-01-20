import React, { useState } from "react";
import Button from "@mui/material/Button";
import { HashLink as Link } from "react-router-hash-link";
import { auth } from "../firebaseDB/firebase";
import "../components/styles/AuthForm.css";

function AuthComponent({
  isLogin,
  btnText,
  hasUsername = true,
  linkTo = "/",
  bottomBtnText,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const login = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = "http://localhost:3000";
      })
      .catch((error) => alert(error.message));
  };

  const signUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        window.location.href = "http://localhost:3000";
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="auth__container">
      <form className="auth__formSignup">
        <center>
          <img
            className="auth__formSignup__Image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
            alt="Instagram"
          />
        </center>
        {hasUsername && (
          <input
            className="auth__formSignup__Input"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          className="auth__formSignup__Input"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth__formSignup__Input"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="auth__formSignup__btn"
          variant="contained"
          onClick={() => {
            if (isLogin) {
              login();
            } else {
              signUp();
            }
          }}
        >
          {btnText}
        </Button>
      </form>
      <div className="auth__bottomBox">
        <p>
          Don't have an account?{" "}
          <Link to={linkTo} className="auth__bottomBox__btn">
            {bottomBtnText}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthComponent;
