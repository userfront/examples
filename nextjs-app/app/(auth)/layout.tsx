import { requireGuest } from "utils/auth";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side redirect to the dashboard if the user is logged in.
  await requireGuest();

  // If the user is not logged in, this layout will act as a wrapper.
  return children;
}
