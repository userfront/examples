import Userfront from "@userfront/react";
import { getPropsFromAccessToken } from "../common/auth.js";
import Navbar from "../components/navbar.js";

const SignupForm = Userfront.build({
  toolId: "nkmbbm",
});

function Signup({ isLoggedIn }) {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <SignupForm />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return getPropsFromAccessToken(ctx);
}

export default Signup;
