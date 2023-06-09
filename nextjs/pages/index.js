import Head from "next/head";
import { getPropsFromAccessToken } from "../common/auth.js";
import styles from "../styles/Home.module.css";

export default function Home({ isLoggedIn }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          {!isLoggedIn && (
            <a href="/signup" className={styles.card}>
              <h3>Sign up &rarr;</h3>
              <p>Register an account.</p>
            </a>
          )}

          {!isLoggedIn && (
            <a href="/login" className={styles.card}>
              <h3>Log in &rarr;</h3>
              <p>Log into your account.</p>
            </a>
          )}

          {isLoggedIn && (
            <a href="/dashboard" className={styles.card}>
              <h3>Dashboard &rarr;</h3>
              <p>View your dashboard.</p>
            </a>
          )}

          <a href="/reset" className={styles.card}>
            <h3>Reset &rarr;</h3>
            <p>Reset your password.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return getPropsFromAccessToken(ctx);
}
