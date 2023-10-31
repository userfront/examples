import { useState, useEffect } from "react";
import Userfront from "@userfront/toolkit/react";
import Navbar from "../components/navbar.js";
import { refreshIdentityAndCookies } from "../common/auth.js";
import styles from "../styles/Dashboard.module.css";
import { useRouter } from "next/router.js";

const Dashboard = ({ isLoggedIn }) => {
  const [user, setUser] = useState({});
  const [data, setData] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setUser(Userfront.user);
    }
  }, []);

  async function getData() {
    const res = await fetch("http://localhost:8080/api/data", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Userfront.tokens.accessToken}`
      }
  });
    const body = await res.json();
    setData(body);
  }

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className={styles.container}>
        <div className={styles.main}>
          <img src={user.image} className={styles.img} />
          <p>{user.email}</p>
          <div>
            <button onClick={Userfront.logout} className={styles.logout}>
              Logout
            </button>
          </div>
        </div>
        <div className={styles.data}>
          <p>
            Data from protected endpoint{" "}
            <span className={styles.code}>/api/data</span>
          </p>
          <button onClick={getData} className={styles.button}>
            Get data
          </button>
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
          <hr />
          <p>
            <span className={styles.code}>Userfront.user</span>
          </p>
          <pre>
            <code>{JSON.stringify(user, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  return refreshIdentityAndCookies(ctx);
}

export default Dashboard;
