import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
      <Link href="/reset">Reset Password</Link>
    </>
  );
}
