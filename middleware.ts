import authConfig from "@/auth.config";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  console.log("in the middleware");

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    console.log("from isApiAuthRoute");

    // return === allow this
    return;
  }

  if (isAuthRoute) {
    console.log("from isAuthRoute");

    if (isLoggedIn) {
      console.log("from isAuthRoute + isLoggedIn");

      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    console.log("from !isLoggedIn and !isPublicRoute");
    return Response.redirect(new URL("/login", nextUrl));
  }

  console.log("ok");

  return;
});

export const config = {
  matcher: ["/tracker"],
};
