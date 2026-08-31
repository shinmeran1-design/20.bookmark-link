"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";

// Supabase가 돌려주는 영문 메시지를 한국어로 변환
function toKoreanError(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }
  if (normalized.includes("email not confirmed")) {
    return "이메일 인증이 필요합니다. 메일함을 확인해 주세요.";
  }
  if (normalized.includes("rate limit") || normalized.includes("too many")) {
    return "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.";
  }
  return "로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

export default function LoginPage() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  const canSubmit =
    email.trim() !== "" && password !== "" && !isSubmitting;

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  // 소셜 로그인 콜백에서 실패로 되돌아온 경우(?error=oauth) 안내 후 쿼리 정리
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") !== "oauth") return;
    window.history.replaceState(null, "", "/login");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- URL 상태를 토스트로 옮기는 일회성 동기화
    setToast("카카오 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.");
  }, []);

  const handleKakaoLogin = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setToast("카카오 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      setIsSubmitting(false);
    }
    // 성공 시 카카오 인증 페이지로 이동하므로 별도 처리 불필요
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

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

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-[var(--text)]">
            이메일
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-[10px] border border-[var(--border)] bg-white px-4 py-3 text-[17px] text-[var(--text)] placeholder-[var(--placeholder)] outline-none focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-[var(--text)]"
          >
            비밀번호
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

        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary mt-1 rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <button
        type="button"
        onClick={handleKakaoLogin}
        disabled={isSubmitting}
        className="mt-3 overflow-hidden rounded-[12px] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- 카카오 제공 버튼 에셋을 그대로 사용 */}
        <img
          src="/kakao_login_large_wide.png"
          alt="카카오 로그인"
          className="block w-full"
        />
      </button>

      <p className="mt-6 text-center text-sm">
        <Link
          href="/forgot-password"
          className="font-medium text-[var(--accent)] hover:underline"
        >
          비밀번호 찾기
        </Link>
      </p>

      <p className="mt-3 text-center text-sm text-[var(--text-sub)]">
        아직 계정이 없으신가요?{" "}
        <Link
          href="/signup"
          className="font-medium text-[var(--accent)] hover:underline"
        >
          회원가입
        </Link>
      </p>
    </div>
  );
}
