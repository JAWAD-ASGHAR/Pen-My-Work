import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/", "/sign-in"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) return NextResponse.next();

  const sessionRes = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
    method: "GET",
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  if (!sessionRes.ok) {
    const signinUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sign-in|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
