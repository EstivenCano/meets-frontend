import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "./app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

const cookieName = "i18next";

async function setTokens(urlParams: string, response: NextResponse) {
  const params = Object.fromEntries(new URLSearchParams(urlParams)) as {
    access: string;
    refresh: string;
  };

  if (params?.access && params?.refresh) {
    await response.cookies.set("access_token", params.access);
    await response.cookies.set("refresh_token", params.refresh);
  }

  return await params;
}

export async function middleware(req: NextRequest) {
  const queryParams = req.url.split("?")[1];

  let lng;
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value as string);
  }
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    const response = NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );

    await setTokens(queryParams, response);

    return response;
  }
  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") as string);
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    await setTokens(queryParams, response);
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  const response = NextResponse.next();
  await setTokens(queryParams, response);

  return response;
}
