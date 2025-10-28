// src/pages/Auth/SignIn.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../../components";
import { HeaderContainer } from "../../containers/header";
import { FooterContainer } from "../../containers/footer";
import * as ROUTES from "../../constant/routes";

export default function SignIn() {
  const navigate = useNavigate();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = !emailAddress || !password;

  const handleSignin = async (event) => {
    event.preventDefault();
    console.log("Sign In clicked", { emailAddress, password });

    try {

      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

      const response = await fetch(`${API_BASE_URL}/api/login`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important for httpOnly cookie
        body: JSON.stringify({ email: emailAddress, password }),
      });

      const data = await response.json(); // always parse response

      if (!response.ok) {
        console.error("Login failed:", data);
        throw new Error(data.error || "Invalid email or password");
      }

      console.log("Login successful:", data);

      // ✅ Browser automatically stores httpOnly cookie
      navigate(ROUTES.BROWSE, { replace: true });
    } catch (err) {
      console.error("Login error:", err.message);
      setEmailAddress("");
      setPassword("");
      setError(err.message);
    }
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign In</Form.Title>
          {error && <Form.Error data-testid="error">{error}</Form.Error>}

          <Form.Base onSubmit={handleSignin} method="POST">
            <Form.Input
              type="email"
              placeholder="Email address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <Form.Input
              type="password"
              value={password}
              autoComplete="off"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Submit disabled={isInvalid} type="submit" data-testid="sign-in">
              Sign In
            </Form.Submit>
          </Form.Base>

          <Form.Text>
            New to Netflix? <Form.Link to={ROUTES.SIGN_UP}>Sign up now.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
          </Form.TextSmall>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}
