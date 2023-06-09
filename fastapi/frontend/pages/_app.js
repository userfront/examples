import Userfront from "@userfront/react";

import "@userfront/react/themes/default.css";
import "../styles/globals.css";

Userfront.init(process.env.NEXT_PUBLIC_USERFRONT_ACCOUNT_ID);

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;
