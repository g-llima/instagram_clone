import React from "react";
import AuthComponent from "../components/AuthComponent";

function SignUp() {
  return (
    <div>
      <AuthComponent
        btnText="Cadastre-se"
        linkTo="/accounts/login"
        isLogin={false}
      />
    </div>
  );
}

export default SignUp;
