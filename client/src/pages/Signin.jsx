import React from "react";
import Container from "../components/Container";
import Form from "../components/Form";
import { SIGN_IN } from "../constants";

const Signin = () => {
  return (
    <div>
      <Container>
        <h1 className="text-3xl text-center">Sign In</h1>
        <Form type={SIGN_IN} />
      </Container>
    </div>
  );
};
export default Signin;
