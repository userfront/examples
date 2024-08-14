import { LoginForm } from "@userfront/next/client";
import Link from "next/link";
import styles from "./page.module.css";

export default function Component() {
  return <main className={styles.main}>
    <div>
      <LoginForm />
    </div>

    <div>
      <div>Or <Link href="/signup">Sign up</Link></div>
      <div>Or <Link href="/reset">Reset</Link></div>
    </div>
  </main>;
}
