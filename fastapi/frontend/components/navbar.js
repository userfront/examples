import styles from "../styles/Navbar.module.css";
import { LogoutButton } from "@userfront/toolkit/react";

export default function Navbar({ isLoggedIn }) {
  return (
    <header className={styles.header}>
      <div>
        <a href="/">Home</a>
      </div>
      <div className={styles.navbarRight}>
        {!isLoggedIn && <a href="/signup">Sign up</a>}
        {!isLoggedIn && <a href="/login">Log in</a>}
        {isLoggedIn && <a href="/dashboard">Dashboard</a>}
        {isLoggedIn && <a href="/reset">Password reset</a>}
        {isLoggedIn && <LogoutButton />}
      </div>
    </header>
  );
}
