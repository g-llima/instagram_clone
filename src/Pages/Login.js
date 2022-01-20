import React, { useState } from "react";
import AuthComponent from "../components/AuthComponent";

function Login() {
  return (
    <div>
      <AuthComponent
        btnText="Login"
        hasUsername={false}
        linkTo="/accounts/signup"
        bottomBtnText="Sign up"
        isLogin={true}
      />
    </div>
  );
}

export default Login;
