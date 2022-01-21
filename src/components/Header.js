import React, { useState, useEffect } from "react";
import "./styles/Header.css";
import { auth } from "../firebaseDB/firebase";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { HashLink as Link } from "react-router-hash-link";
import ModalBase from "./ModalBase";

function Header() {
  const [user, setUser] = useState(null);
  const [username] = useState("");
  const [isAvatarClicked, setIsAvatarClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        if (authUser.displayName) {
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
      }
    });
    return () => {
      //cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  return (
    <div className="app__header">
      <div className="app__header__content">
        <Link to="/">
          <img
            className="app__headerImage"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
            alt="Instagram"
          />
        </Link>
        {user ? (
          <>
            <div className="app__header__rightContent">
              <svg
                className="app__header__rightContent__newPost"
                color="#262626"
                fill="#262626"
                height="24"
                width="24"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                <path
                  d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="6.545"
                  x2="17.455"
                  y1="12.001"
                  y2="12.001"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="12.003"
                  x2="12.003"
                  y1="6.545"
                  y2="17.455"
                ></line>
              </svg>
              <div className="app__header__avatar">
                <Avatar
                  onClick={() => setIsAvatarClicked(!isAvatarClicked)}
                  className="app__header__avatar__icon"
                  alt={user.displayName}
                />
                {isAvatarClicked && (
                  <div className="app__header__avatar__menu">
                    <ul>
                      <li>
                        <p className="app__header__avatar__menu__username">
                          <strong>{user.displayName}</strong>
                        </p>
                      </li>
                      <li>
                        <button
                          onClick={() => auth.signOut()}
                          className="app__header__avatar__menu__logoutBtn"
                        >
                          Sair
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="app__header__authContainer">
            <Link to="/accounts/login">
              <Button
                variant="contained"
                className="app__header__authBtn__Login"
              >
                Entrar
              </Button>
            </Link>
            <Link to="/accounts/signup">
              <Button className="app__header__authBtn__Signup">
                Cadastre-se
              </Button>
            </Link>
          </div>
        )}
      </div>
      <ModalBase
        openModal={isModalOpen}
        closeModal={() => setIsModalOpen(!isModalOpen)}
        username={user?.displayName}
      />
    </div>
  );
}

export default Header;
