import { useState, useEffect } from "react";
import Userfront from "@userfront/react";
import Navbar from "../components/navbar.js";
import { getPropsFromAccessToken } from "../common/auth.js";
import styles from "../styles/Dashboard.module.css";

const Dashboard = ({ isLoggedIn }) => {
  const [user, setUser] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    setUser(Userfront.user);
  });

  async function getData() {
    const res = await fetch("/api/data");
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
  return getPropsFromAccessToken(ctx, { verify: true });
}

export default Dashboard;
