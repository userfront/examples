"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useUserfront } from "@userfront/next/client";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useUserfront();

  React.useEffect(() => {
    if (isAuthenticated || isLoading || !router) return;

    router.push("/login");
  }, [isAuthenticated, isLoading, router]);

  if (!isAuthenticated || isLoading) {
    return null;
  }

  return children;
}
