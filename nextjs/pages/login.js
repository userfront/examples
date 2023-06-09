import Userfront from "@userfront/react";
import { getPropsFromAccessToken } from "../common/auth.js";
import Navbar from "../components/navbar.js";

const LoginForm = Userfront.build({
  toolId: "alnkkd",
});

function Login({ isLoggedIn }) {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <LoginForm />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return getPropsFromAccessToken(ctx);
}

export default Login;
