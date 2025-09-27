"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function ConnectButton() {
  return (
    <Button onClick={() => signIn("google")}>
      Sign In
    </Button>
  );
}
