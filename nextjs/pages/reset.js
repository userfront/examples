import Userfront from "@userfront/react";
import { getPropsFromAccessToken } from "../common/auth.js";
import Navbar from "../components/navbar.js";

const PasswordResetForm = Userfront.build({
  toolId: "dkbmmo",
});

function PasswordReset({ isLoggedIn }) {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <PasswordResetForm />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return getPropsFromAccessToken(ctx);
}

export default PasswordReset;
