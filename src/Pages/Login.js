import React from "react";
import AuthComponent from "../components/AuthComponent";

function Login() {
  return (
    <div>
      <AuthComponent
        btnText="Entrar"
        hasUsername={false}
        linkTo="/accounts/signup"
        isLogin={true}
      />
    </div>
  );
}

export default Login;
