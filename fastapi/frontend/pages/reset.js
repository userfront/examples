import { PasswordResetForm } from "@userfront/toolkit/react";
import { refreshIdentityAndCookies } from "../common/auth.js";
import Navbar from "../components/navbar.js";


function PasswordReset({ isLoggedIn }) {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <PasswordResetForm />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return refreshIdentityAndCookies(ctx);
}

export default PasswordReset;
