"use client";

import { SessionProvider } from "next-auth/react";
import { Theme } from "@radix-ui/themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Theme accentColor="violet" radius="large">
        {children}
      </Theme>
    </SessionProvider>
  );
}
