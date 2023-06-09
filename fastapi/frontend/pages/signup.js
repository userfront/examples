import { SignupForm } from "@userfront/react";
import { refreshIdentityAndCookies } from "../common/auth.js";
import Navbar from "../components/navbar.js";


function Signup({ isLoggedIn }) {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <SignupForm />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return refreshIdentityAndCookies(ctx);
}

export default Signup;
