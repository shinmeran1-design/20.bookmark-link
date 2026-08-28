"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="nav-link mt-auto rounded-full px-4 py-2 text-left text-sm font-medium text-[var(--text-sub)] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
}
