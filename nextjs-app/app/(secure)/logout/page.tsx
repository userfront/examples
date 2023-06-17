"use client";

import * as React from "react";
import Userfront from "@userfront/react";
import { useRouter } from "next/navigation";

export default async function Logout() {
  const router = useRouter();

  React.useEffect(() => {
    Userfront.logout();
  }, []);

  return <p>Logging out...</p>;
}
