import { requireAuth } from "utils/auth";

export default async function SecureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side redirect to the login page if the user is not logged in.
  await requireAuth();

  // If the user is logged in, this layout will act as a wrapper.
  return children;
}
