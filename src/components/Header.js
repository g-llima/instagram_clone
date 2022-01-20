import React, { useState, useEffect } from "react";
import "./styles/Header.css";
import { auth } from "../firebaseDB/firebase";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { HashLink as Link } from "react-router-hash-link";

function Header() {
  const [user, setUser] = useState(null);
  const [username] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
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
        <img
          className="app__headerImage"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
          alt="Instagram"
        />
        {user ? (
          <Avatar
            className="post__avatar"
            onClick={() => auth.signOut()}
            alt={username}
          />
        ) : (
          <div className="app__header__authContainer">
            <Link to="/accounts/login">
              <Button
                variant="contained"
                className="app__header__authBtn__Login"
              >
                Log In
              </Button>
            </Link>
            <Link to="/accounts/signup">
              <Button className="app__header__authBtn__Signup">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
