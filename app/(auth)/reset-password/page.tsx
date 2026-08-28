"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";

// Supabase가 돌려주는 영문 메시지를 한국어로 변환
function toKoreanError(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes("session missing") || normalized.includes("auth session")) {
    return "유효하지 않거나 만료된 링크입니다. 다시 시도해 주세요.";
  }
  if (normalized.includes("should be different") || normalized.includes("same")) {
    return "기존 비밀번호와 다른 비밀번호를 입력해 주세요.";
  }
  if (normalized.includes("at least") || normalized.includes("password")) {
    return "비밀번호는 6자 이상이어야 합니다.";
  }
  return "비밀번호 재설정에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  const canSubmit =
    password !== "" && passwordConfirm !== "" && !isSubmitting;

  // 리셋 링크로 들어오면 브라우저 클라이언트가 URL의 코드를 세션으로 교환한다
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(Boolean(data.session));
      setChecking(false);
    });
  }, [supabase]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    if (password !== passwordConfirm) {
      setToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setToast(toKoreanError(error.message));
      setIsSubmitting(false);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex w-full max-w-sm flex-col">
      {toast && (
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
          <div className="rounded-full bg-[var(--error)] px-5 py-2.5 text-sm font-medium text-white shadow-lg">
            {toast}
          </div>
        </div>
      )}

      <span className="mb-10 text-center text-[22px] font-semibold tracking-tight text-[var(--text)]">
        🔖 Bookmark Link
      </span>

      {checking ? (
        <p className="text-center text-sm text-[var(--text-sub)]">확인 중...</p>
      ) : !hasSession ? (
        <div className="flex flex-col gap-4">
          <p className="rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-center text-sm text-[var(--text)]">
            유효하지 않거나 만료된 링크입니다.
          </p>
          <p className="text-center text-sm text-[var(--text-sub)]">
            <Link
              href="/forgot-password"
              className="font-medium text-[var(--accent)] hover:underline"
            >
              비밀번호 찾기 다시 시도
            </Link>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[var(--text)]"
            >
              새 비밀번호
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-[10px] border border-[var(--border)] bg-white px-4 py-3 text-[17px] text-[var(--text)] placeholder-[var(--placeholder)] outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password-confirm"
              className="text-sm font-medium text-[var(--text)]"
            >
              새 비밀번호 확인
            </label>
            <input
              id="password-confirm"
              type="password"
              required
              placeholder="••••••••"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
              className="rounded-[10px] border border-[var(--border)] bg-white px-4 py-3 text-[17px] text-[var(--text)] placeholder-[var(--placeholder)] outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]"
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="btn-primary mt-1 rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? "변경 중..." : "비밀번호 변경"}
          </button>
        </form>
      )}
    </div>
  );
}
