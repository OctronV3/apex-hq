"use client";

import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { ApexAuthContext, ApexUser } from "./auth-context";

export const isClerkConfigured =
  typeof process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === "string" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

const ClerkAuthProvider = isClerkConfigured
  ? dynamic(() => import("./clerk-auth-provider").then((mod) => ({ default: mod.ClerkAuthProvider })), { ssr: false })
  : null;

function FallbackAuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    isLoaded: boolean;
    user: ApexUser | null;
  }>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("apex_user");
      if (saved) {
        try {
          return { isLoaded: true, user: JSON.parse(saved) };
        } catch {
          // ignore
        }
      }
    }
    return { isLoaded: true, user: null };
  });

  const { isLoaded, user } = state;

  const setUser = useCallback((user: ApexUser | null) => {
    setState((prev) => ({ ...prev, user }));
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("apex_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("apex_user");
      }
    }
  }, []);

  const signIn = useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.href = "/sign-in";
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const signInWithDemo = useCallback(
    (name: string) => {
      setUser({
        id: "demo",
        name: name || "Bruce Wayne",
        email: "bruce@apex.hq",
        imageUrl: null,
      });
    },
    [setUser]
  );

  const value = useMemo(
    () => ({
      isLoaded,
      isSignedIn: !!user,
      user,
      signIn,
      signOut,
      signInWithDemo,
    }),
    [isLoaded, user, signIn, signOut, signInWithDemo]
  );

  return (
    <ApexAuthContext.Provider value={value}>
      {children}
    </ApexAuthContext.Provider>
  );
}

export function ApexAuthProvider({ children }: { children: React.ReactNode }) {
  if (isClerkConfigured && ClerkAuthProvider) {
    return <ClerkAuthProvider>{children}</ClerkAuthProvider>;
  }

  return <FallbackAuthProvider>{children}</FallbackAuthProvider>;
}
