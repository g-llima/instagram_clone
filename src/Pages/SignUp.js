import React from "react";
import AuthComponent from "../components/AuthComponent";

function SignUp() {
  return (
    <div>
      <AuthComponent
        btnText="Sign Up"
        linkTo="/accounts/login"
        bottomBtnText="Login"
        isLogin={false}
      />
    </div>
  );
}

export default SignUp;
