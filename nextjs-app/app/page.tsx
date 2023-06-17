import { redirect } from "next/navigation";
import { verifyToken } from "../utils/auth";

export default async function HomePage() {
  const { isLoggedIn } = await verifyToken();

  // Redirect the user based on their authentication.
  if (isLoggedIn) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }

  // Or render content visible to both.
}
