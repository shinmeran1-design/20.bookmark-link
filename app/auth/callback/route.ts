import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

// 소셜 로그인(카카오 등) 공급자가 인가 코드를 들고 되돌아오는 지점.
// 코드를 세션으로 교환해 인증 쿠키를 심고 앱으로 보낸다.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // 코드가 없거나 교환에 실패하면 로그인 페이지로 되돌린다
  return NextResponse.redirect(`${origin}/login?error=oauth`);
}
