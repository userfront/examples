import Userfront from "@userfront/toolkit/react";

import "../styles/globals.css";

Userfront.init(process.env.NEXT_PUBLIC_USERFRONT_WORKSPACE_ID);

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
