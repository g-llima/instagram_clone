import React, { useState } from "react";
import Button from "@mui/material/Button";
import { HashLink as Link } from "react-router-hash-link";
import { auth } from "../firebaseDB/firebase";
import "../components/styles/AuthForm.css";
import Alert from "@mui/material/Alert";

function AuthComponent({ isLogin, btnText, hasUsername = true, linkTo = "/" }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  let userWithoutSpaces = username.trim();
  let passWithoutSpaces = password.trim();

  const login = () => {
    if (userWithoutSpaces.length == 0 && !isLogin) {
      setErrorMsg("Nome do usuário inválido");
      setErrorOpen("true");
      setErrorUser(true);
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = process.env.REACT_APP_PAGE_URL;
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMsg("E-mail inválido");
            setErrorOpen("true");
            setErrorEmail(true);
            break;
          case "auth/user-not-found":
            setErrorMsg("Usuário não encontrado");
            setErrorOpen("true");
            setErrorEmail(true);
            setErrorPass(true);
            break;
          case "auth/wrong-password":
            setErrorMsg("Usuário não encontrado");
            setErrorOpen("true");
            setErrorEmail(true);
            setErrorPass(true);
            break;
          default:
            setErrorMsg("Um erro aconteceu");
            setErrorOpen("true");
            setErrorEmail(true);
            setErrorPass(true);
        }
      });
  };

  const signUp = () => {
    if (userWithoutSpaces.length == 0) {
      setErrorMsg("Nome do usuário inválido");
      setErrorOpen("true");
      setErrorUser(true);
      return;
    }
    if (passWithoutSpaces.length == 0) {
      setErrorMsg("Senha inválida");
      setErrorOpen("true");
      setErrorPass(true);
      return;
    }
    if (passWithoutSpaces.length < 6) {
      setErrorMsg("Senha muito curta (menor que 6 dígitos)");
      setErrorOpen("true");
      setErrorPass(true);
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        window.location.href = process.env.REACT_APP_PAGE_URL;
        return authUser.user.updateProfile({
          displayName: userWithoutSpaces,
        });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMsg("E-mail inválido");
            setErrorOpen("true");
            setErrorEmail(true);
            break;
          default:
            setErrorMsg("Um erro aconteceu");
            setErrorOpen("true");
            setErrorUser(true);
            setErrorEmail(true);
            setErrorPass(true);
        }
      });
  };

  return (
    <div className="auth__container">
      <form className="auth__formSignup">
        <center>
          <Link to="/">
            <img
              className="auth__formSignup__Image"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
              alt="Instagram"
            />
          </Link>
        </center>
        {hasUsername && (
          <input
            className={`auth__formSignup__Input ${
              errorUser ? "invInput" : null
            }`}
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          className={`auth__formSignup__Input ${
            errorEmail ? "invInput" : null
          }`}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={`auth__formSignup__Input ${errorPass ? "invInput" : null}`}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
        {isLogin ? (
          <p>
            Não possui uma conta?{" "}
            <Link to={linkTo} className="auth__bottomBox__btn">
              Cadastre-se
            </Link>
          </p>
        ) : (
          <p>
            Já possui uma conta?{" "}
            <Link to={linkTo} className="auth__bottomBox__btn">
              Entrar
            </Link>
          </p>
        )}
      </div>
      {errorOpen && (
        <Alert
          severity="error"
          className="auth__alertError"
          onClose={() => {
            setErrorOpen(false);
          }}
        >
          {errorMsg}
        </Alert>
      )}
    </div>
  );
}

export default AuthComponent;
