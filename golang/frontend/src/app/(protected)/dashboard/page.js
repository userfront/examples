"use client";
import { useState } from "react";
import { useUserfront } from "@userfront/next/client";
import styles from "./page.module.css";

export default function Dashboard({ isLoggedIn }) {
  // Clears the session and sends user to the "After-logout path"
  const { tokens, logout } = useUserfront();
  const [data, setData] = useState();

  async function getData() {
    const res = await fetch("https://localhost:8080/api/data", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });

    const body = await res.json();
    setData(body);
  }

  let serverResponse = "";
  if (data) {
    serverResponse = <>
    <h2>Server response</h2>
    <div>[this is the user info contained within the jwt]</div>
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
    </>;
  }

  return (
    <div >
      <main className={styles.main}>
        <h1>Dashboard</h1>
        <p>This is a protected page. You can see this because you are logged in.</p>

        <div><button onClick={getData}>Make a request to the server</button></div>

        <div>{serverResponse}</div>

        <div>
          <button onClick={ logout }>click here to log out</button>
        </div>
      </main>
    </div>
  );
}
