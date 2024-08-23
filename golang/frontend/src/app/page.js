import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1>Nextjs + Golang example</h1>
        <div>
          Go to the <Link href="/dashboard">dashboard</Link>
        </div>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
