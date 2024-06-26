import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { updateSession } from "@/utils/supabase/middleware";

const protectedRoutes = ["/dashboard"];

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute =
    protectedRoutes.includes(path) || path.startsWith("/dashboard");

  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if ((error || !data?.user) && isProtectedRoute) {
    return NextResponse.redirect(
      new URL(`/login?callbackURL=${path}`, request.nextUrl),
    );
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
