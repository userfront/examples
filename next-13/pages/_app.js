import "../styles/globals.css";
import Userfront from "@userfront/toolkit/react";

Userfront.init("demo1234");

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
