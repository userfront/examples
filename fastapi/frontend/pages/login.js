import { LoginForm } from "@userfront/react";
import { refreshIdentityAndCookies } from "../common/auth.js";
import Navbar from "../components/navbar.js";

function Login({ isLoggedIn }) {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <LoginForm />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return refreshIdentityAndCookies(ctx);
}

export default Login;
